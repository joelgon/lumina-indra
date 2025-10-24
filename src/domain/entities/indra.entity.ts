import { ApiProperty } from '@nestjs/swagger';
import { DateFormatUtil } from '@src/shared/utils/date-format.util';

export class IndraEntity {
  @ApiProperty({
    example: 'Nublado',
    description: 'Condiciones climáticas',
    type: String,
    required: true,
  })
  conditions: string;

  @ApiProperty({
    example: 17.5,
    description: 'temperature of the day',
    type: Number,
    required: true,
  })
  temperature: number;

  @ApiProperty({
    example: 15.5,
    description: 'feels like',
    type: Number,
    required: true,
  })
  feelsLike: number;

  @ApiProperty({
    example: 'Nublado ao longo do dia',
    description: 'weather description',
    type: String,
    required: true,
  })
  description: string;

  @ApiProperty({
    example: 70,
    description: 'humidity percentage',
    type: Number,
    required: true,
  })
  humidity: number;

  @ApiProperty({
    example: '2023-10-05 00:00:00',
    description: 'date of the weather data',
    type: String,
    required: true,
  })
  date: string;

  @ApiProperty({
    example: 1696435200,
    description: 'timestamp of the weather data',
    type: Number,
    required: true,
  })
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
