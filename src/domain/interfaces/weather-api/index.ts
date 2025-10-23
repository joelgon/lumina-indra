import { IndraEntity } from '@src/domain/entities/indra.entity';

export namespace IWeatherApiInterface {
  export abstract class WeatherApiInterface {
    abstract execute(): Promise<IWeatherApiInterface.response | null>;
  }

  export type weatherApiResponse = {
    cod: string;
    message: number;
    cnt: number;
    list: {
      dt: number;
      main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
      };
      weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
      }[];
      clouds: {
        all: number;
      };
      wind: {
        speed: number;
        deg: number;
        gust: number;
      };
      visibility: number;
      pop: number;
      sys: {
        pod: 'n' | 'd';
      };
      dt_txt: string | Date;
    }[];
    city: {
      id: number;
      name: string;
      coord: {
        lat: number;
        lon: number;
      };
      country: string;
      population: number;
      timezone: number;
      sunrise: number;
      sunset: number;
    };
  };

  export type response = IndraEntity[];
}
