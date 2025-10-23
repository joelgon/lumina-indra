import { IndraEntity } from '@src/domain/entities/indra.entity';

export namespace IVisualCrossingInterface {
  export abstract class VisualCrossingInterface {
    abstract execute(): Promise<IVisualCrossingInterface.response | null>;
  }
  export type visualCrossingApiResponse = {
    queryCost: number;
    latitude: number;
    longitude: number;
    resolvedAddress: string;
    address: string;
    timezone: string;
    tzoffset: number;
    description: string;
    alerts: [];
    stations: any;
    currentConditions: any;
    days: {
      datetime: string;
      datetimeEpoch: number;
      tempmax: number;
      tempmin: number;
      temp: number;
      feelslikemax: number;
      feelslikemin: number;
      feelslike: number;
      dew: number;
      humidity: number;
      precip: number;
      precipprob: number;
      precipcover: number;
      preciptype: null;
      snow: number;
      snowdepth: number;
      windgust: number;
      windspeed: number;
      winddir: number;
      pressure: number;
      cloudcover: number;
      visibility: number;
      solarradiation: number;
      solarenergy: number;
      uvindex: number;
      severerisk: number;
      sunrise: string;
      sunriseEpoch: number;
      sunset: string;
      sunsetEpoch: number;
      moonphase: number;
      conditions: string;
      description: string;
      icon: string;
      stations: string[];
      source: string;
      hours: {
        datetime: string;
        datetimeEpoch: number;
        temp: number;
        feelslike: number;
        humidity: number;
        dew: number;
        precip: number;
        precipprob: number;
        snow: number;
        snowdepth: number;
        preciptype: null;
        windgust: number;
        windspeed: number;
        winddir: number;
        pressure: number;
        visibility: number;
        cloudcover: number;
        solarradiation: number;
        solarenergy: number;
        uvindex: number;
        severerisk: number;
        conditions: string;
        icon: string;
        stations: string[];
        source: string;
      }[];
    }[];
  };

  export type response = IndraEntity[];
}
