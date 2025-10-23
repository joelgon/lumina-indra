import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { VisualCrossing } from '.';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { IndraEntity } from '@src/domain/entities/indra.entity';
import { IVisualCrossingInterface } from '@src/domain/interfaces/visual-crossing';

describe('VisualCrossing', () => {
  let service: VisualCrossing;
  let httpService: HttpService;

  const mockApiResponse: IVisualCrossingInterface.visualCrossingApiResponse = {
    queryCost: 1,
    latitude: -23.59808,
    longitude: -46.69022,
    resolvedAddress: '-23.59808,-46.69022',
    address: '-23.59808,-46.69022',
    timezone: 'America/Sao_Paulo',
    tzoffset: -3.0,
    description: 'Esfriando com uma chance de chuva Vários dias.',
    days: [
      {
        datetime: '2025-10-23',
        datetimeEpoch: 1761188400,
        tempmax: 25.1,
        tempmin: 12.7,
        temp: 17.5,
        feelslikemax: 25.1,
        feelslikemin: 12.7,
        feelslike: 17.5,
        dew: 9.0,
        humidity: 61.9,
        precip: 0.0,
        precipprob: 0.0,
        precipcover: 0.0,
        preciptype: null,
        snow: 0.0,
        snowdepth: 0.0,
        windgust: 33.8,
        windspeed: 22.7,
        winddir: 114.1,
        pressure: 1024.0,
        cloudcover: 15.2,
        visibility: 18.8,
        solarradiation: 336.4,
        solarenergy: 29.1,
        uvindex: 10.0,
        severerisk: 10.0,
        sunrise: '05:26:52',
        sunriseEpoch: 1761208012,
        sunset: '18:15:36',
        sunsetEpoch: 1761254136,
        moonphase: 0.07,
        conditions: 'condições claras',
        description: 'Condições claras ao longo do dia.',
        icon: 'clear-day',
        stations: ['SBMT', 'SBKP', 'F7461', 'SBSP', 'SBGR'],
        source: 'comb',
        hours: [
          {
            datetime: '00:00:00',
            datetimeEpoch: 1761188400,
            temp: 13.0,
            feelslike: 13.0,
            humidity: 87.47,
            dew: 10.9,
            precip: 0.0,
            precipprob: 0.0,
            snow: 0.0,
            snowdepth: 0.0,
            preciptype: null,
            windgust: 31.3,
            windspeed: 11.1,
            winddir: 139.0,
            pressure: 1028.0,
            visibility: 10.0,
            cloudcover: 25.0,
            solarradiation: 0.0,
            solarenergy: 0.0,
            uvindex: 0.0,
            severerisk: 10.0,
            conditions: 'Parcialmente nublado',
            icon: 'partly-cloudy-night',
            stations: ['SBKP', 'F7461', 'SBSP', 'SBGR'],
            source: 'obs',
          },
        ],
      },
    ],
    alerts: [],
    stations: {
      SBMT: {
        distance: 10645.0,
        latitude: -23.52,
        longitude: -46.63,
        useCount: 0,
        id: 'SBMT',
        name: 'SBMT',
        quality: 37,
        contribution: 0.0,
      },
      SBKP: {
        distance: 80339.0,
        latitude: -23.0,
        longitude: -47.13,
        useCount: 0,
        id: 'SBKP',
        name: 'SBKP',
        quality: 50,
        contribution: 0.0,
      },
      F7461: {
        distance: 6360.0,
        latitude: -23.616,
        longitude: -46.631,
        useCount: 0,
        id: 'F7461',
        name: 'FW7461 Sao Paulo BR',
        quality: 0,
        contribution: 0.0,
      },
      SBSP: {
        distance: 4773.0,
        latitude: -23.62,
        longitude: -46.65,
        useCount: 0,
        id: 'SBSP',
        name: 'SBSP',
        quality: 49,
        contribution: 0.0,
      },
      SBGR: {
        distance: 29247.0,
        latitude: -23.43,
        longitude: -46.47,
        useCount: 0,
        id: 'SBGR',
        name: 'SBGR',
        quality: 50,
        contribution: 0.0,
      },
    },
    currentConditions: {
      datetime: '08:00:00',
      datetimeEpoch: 1761217200,
      temp: 15.7,
      feelslike: 15.7,
      humidity: 74.5,
      dew: 11.2,
      precip: 0.0,
      precipprob: 0.0,
      snow: 0.0,
      snowdepth: 0.0,
      preciptype: null,
      windgust: 11.2,
      windspeed: 14.2,
      winddir: 35.0,
      pressure: 1027.8,
      visibility: 10.0,
      cloudcover: 25.0,
      solarradiation: 273.0,
      solarenergy: 1.0,
      uvindex: 3.0,
      conditions: 'Parcialmente nublado',
      icon: 'partly-cloudy-day',
      stations: ['SBMT', 'SBSP', 'F7461'],
      source: 'obs',
      sunrise: '05:26:52',
      sunriseEpoch: 1761208012,
      sunset: '18:15:36',
      sunsetEpoch: 1761254136,
      moonphase: 0.07,
    },
  };

  const mockAxiosResponse: AxiosResponse = {
    data: mockApiResponse,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: <any>{},
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisualCrossing, { provide: HttpService, useValue: { get: jest.fn() } }],
    }).compile();

    service = module.get<VisualCrossing>(VisualCrossing);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return mapped IndraEntity array', async () => {
    jest.spyOn(httpService, 'get').mockReturnValue(of(mockAxiosResponse));

    const result = await service.execute();

    expect(result).toHaveLength(1);

    expect(result![0]).toEqual(
      IndraEntity.build({
        date: expect.any(String),
        timestamp: 1761188400 * 1000,
        conditions: 'Parcialmente nublado',
        description: 'Condições claras ao longo do dia.',
        temperature: 13,
        feelsLike: 13,
        humidity: 87.47,
      })
    );
  });

  it('should return null on error', async () => {
    jest.spyOn(httpService, 'get').mockImplementation(() => {
      throw new Error('API error');
    });

    const result = await service.execute();
    expect(result).toBeNull();
  });
});
