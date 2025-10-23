import { Inject, Injectable, Logger, PreconditionFailedException } from '@nestjs/common';
import { IIndraInterface } from '@src/domain/interfaces/indra';
import { VISUAL_CROSSING_API, WEATHER_API } from '@src/shared/constants';

@Injectable()
export class IndraMomentUseCase implements IIndraInterface.IIndraFindOneUseCase {
  private readonly logger = new Logger(IndraMomentUseCase.name);

  constructor(
    @Inject(WEATHER_API) private readonly weatherApi: IIndraInterface.IIndraFindManyUseCase,
    @Inject(VISUAL_CROSSING_API) private readonly visualCrossingApi: IIndraInterface.IIndraFindManyUseCase
  ) {}

  async execute(date: Date): Promise<IIndraInterface.ResponseOne> {
    const targetTimestamp = date.getTime();

    const [visualCrossingForecasts, weatherForecasts] = await Promise.all([this.visualCrossingApi.execute(), this.weatherApi.execute()]);

    const forecast = visualCrossingForecasts || weatherForecasts || [];

    if (forecast.length === 0) throw new PreconditionFailedException('No forecast data available from any API.');

    return forecast.reduce((closest, current) => {
      const currentDiff = Math.abs(current.timestamp - targetTimestamp);
      const closestDiff = Math.abs(closest.timestamp - targetTimestamp);
      return currentDiff < closestDiff ? current : closest;
    });
  }
}
