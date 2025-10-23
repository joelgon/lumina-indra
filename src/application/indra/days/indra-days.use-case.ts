import { Inject, Injectable, Logger } from '@nestjs/common';
import { IIndraInterface } from '@src/domain/interfaces/indra';
import { VISUAL_CROSSING_API, WEATHER_API } from '@src/shared/constants';

@Injectable()
export class IndraDaysUseCase implements IIndraInterface.IIndraFindManyUseCase {
  private readonly logger = new Logger(IndraDaysUseCase.name);

  constructor(
    @Inject(WEATHER_API) private readonly weatherApi: IIndraInterface.IIndraFindManyUseCase,
    @Inject(VISUAL_CROSSING_API) private readonly visualCrossingApi: IIndraInterface.IIndraFindManyUseCase
  ) {}

  async execute(): Promise<IIndraInterface.ResponseMany> {
    const [visualCrossingForecasts, weatherForecasts] = await Promise.all([this.visualCrossingApi.execute(), this.weatherApi.execute()]);

    const forecasts = visualCrossingForecasts || weatherForecasts || [];

    const forecastInPeriod: IIndraInterface.ResponseMany = [];

    const endOfThisDay = new Date().setHours(23, 59, 59, 999);
    const endOfThreeDays = new Date().setHours(23, 59, 59, 999) + 3 * 24 * 60 * 60 * 1000;

    for (const forecast of forecasts) {
      if (forecast.timestamp > endOfThisDay && forecast.timestamp <= endOfThreeDays) {
        const initialOfDay = new Date(forecast.timestamp).setHours(0, 0, 0, 0);
        const existDay = forecastInPeriod.find((day) => day.timestamp === initialOfDay);
        if (existDay) continue;

        forecast.setTimestamp(initialOfDay).setDate(new Date(initialOfDay));
        forecastInPeriod.push(forecast);
      }
    }

    return forecastInPeriod;
  }
}
