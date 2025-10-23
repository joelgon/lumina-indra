import { Test, TestingModule } from '@nestjs/testing';
import { WeatherApi } from '.';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { Logger } from '@nestjs/common';
import { IndraEntity } from '@src/domain/entities/indra.entity';
import { IWeatherApiInterface } from '@src/domain/interfaces/weather-api';

describe('WeatherApi', () => {
  let sut: WeatherApi;
  let httpService: HttpService;

  const mockWeatherResponse: IWeatherApiInterface.weatherApiResponse = {
    cod: '200',
    message: 0,
    cnt: 40,
    list: [
      {
        dt: 1761188400,
        main: {
          temp: 13.94,
          feels_like: 13.56,
          temp_min: 13.94,
          temp_max: 14.45,
          pressure: 1027,
          sea_level: 1027,
          grnd_level: 934,
          humidity: 83,
          temp_kf: -0.51,
        },
        weather: [
          {
            id: 802,
            main: 'Clouds',
            description: 'nuvens dispersas',
            icon: '03n',
          },
        ],
        clouds: {
          all: 40,
        },
        wind: {
          speed: 4.23,
          deg: 110,
          gust: 7.74,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'n',
        },
        dt_txt: '2025-10-23 03:00:00',
      },
    ],
    city: {
      id: 3461570,
      name: 'Ibirapuera',
      coord: {
        lat: -23.5981,
        lon: -46.6902,
      },
      country: 'BR',
      population: 0,
      timezone: -10800,
      sunrise: 1761121654,
      sunset: 1761167671,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherApi,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    sut = module.get<WeatherApi>(WeatherApi);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should return mapped IndraEntity array on success', async () => {
    jest.spyOn(httpService, 'get').mockReturnValue(of(<any>{ data: mockWeatherResponse, status: 200, statusText: 'OK', headers: {}, config: {} }));

    const result = await sut.execute();

    expect(result).toHaveLength(1);
    expect(result?.[0]).toBeInstanceOf(IndraEntity);
    expect(result?.[0].conditions).toBe('Clouds');
    expect(result?.[0].description).toBe('nuvens dispersas');
    expect(result?.[0].temperature).toBe(13.94);
  });

  it('should return null and log error on failure', async () => {
    const loggerSpy = jest.spyOn(sut['logger'], 'error');
    jest.spyOn(httpService, 'get').mockReturnValue(throwError(() => new Error('API error')));

    const result = await sut.execute();

    expect(result).toBeNull();
    expect(loggerSpy).toHaveBeenCalledWith(expect.any(Error));
  });
});
