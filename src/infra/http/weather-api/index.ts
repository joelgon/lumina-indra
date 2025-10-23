import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { IndraEntity } from '@src/domain/entities/indra.entity';
import { IWeatherApiInterface } from '@src/domain/interfaces/weather-api';
import { DateFormatUtil } from '@src/shared/utils/date-format.util';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherApi implements IWeatherApiInterface.WeatherApiInterface {
  private readonly logger: Logger = new Logger(WeatherApi.name);

  constructor(private readonly httpService: HttpService) {}

  async execute(): Promise<IWeatherApiInterface.response | null> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<IWeatherApiInterface.weatherApiResponse>('data/2.5/forecast', {
          params: {
            lat: process.env.FAKE_LAT,
            lon: process.env.FAKE_LON,
            appid: process.env.WEATHER_API_KEY,
            units: 'metric',
            lang: 'pt_br',
          },
        })
      );

      return data.list.map((item) =>
        IndraEntity.build({
          conditions: item.weather[0].main,
          description: item.weather[0].description,
          temperature: item.main.temp,
          feelsLike: item.main.feels_like,
          humidity: item.main.humidity,
          date: DateFormatUtil.format(new Date(item.dt * 1000)),
          timestamp: item.dt * 1000,
        })
      );
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }
}
