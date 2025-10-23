import { DateFormatUtil } from '@src/shared/utils/date-format.util';

export class IndraEntity {
  conditions: string;
  temperature: number;
  feelsLike: number;
  description: string;
  humidity: number;
  date: string;
  timestamp: number;

  private constructor(
    conditions: string,
    temperature: number,
    feelsLike: number,
    description: string,
    humidity: number,
    date: string,
    timestamp: number
  ) {
    this.conditions = conditions;
    this.temperature = temperature;
    this.feelsLike = feelsLike;
    this.description = description;
    this.humidity = humidity;
    this.date = date;
    this.timestamp = timestamp;
  }

  static build(params: {
    conditions: string;
    temperature: number;
    feelsLike: number;
    description: string;
    humidity: number;
    date: string;
    timestamp: number;
  }): IndraEntity {
    return new IndraEntity(
      params.conditions,
      params.temperature,
      params.feelsLike,
      params.description,
      params.humidity,
      params.date,
      params.timestamp
    );
  }

  public setTimestamp(timestamp: number): this {
    this.timestamp = timestamp;
    return this;
  }

  public setDate(date: Date): this {
    this.date = DateFormatUtil.format(date);
    return this;
  }
}
