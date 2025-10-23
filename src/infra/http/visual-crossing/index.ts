import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { IndraEntity } from '@src/domain/entities/indra.entity';
import { IVisualCrossingInterface } from '@src/domain/interfaces/visual-crossing';
import { DateFormatUtil } from '@src/shared/utils/date-format.util';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class VisualCrossing implements IVisualCrossingInterface.VisualCrossingInterface {
  private readonly logger: Logger = new Logger(VisualCrossing.name);

  constructor(private readonly httpService: HttpService) {}

  async execute(): Promise<IVisualCrossingInterface.response | null> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<IVisualCrossingInterface.visualCrossingApiResponse>(`${process.env.FAKE_LAT},${process.env.FAKE_LON}`, {
          params: {
            key: process.env.VISUAL_CROSSING_API_KEY,
            unitGroup: 'metric',
            lang: 'pt',
          },
        })
      );

      return data.days.flatMap((day) =>
        day.hours.map((hour) =>
          IndraEntity.build({
            date: DateFormatUtil.format(new Date(hour.datetimeEpoch * 1000)),
            timestamp: hour.datetimeEpoch * 1000,
            conditions: hour.conditions,
            description: day.description,
            temperature: hour.temp,
            feelsLike: hour.feelslike,
            humidity: hour.humidity,
          })
        )
      );
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }
}
