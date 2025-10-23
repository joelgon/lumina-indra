import { Inject, Injectable, Logger } from '@nestjs/common';
import { IndraEntity } from '@src/domain/entities/indra.entity';
import { IIndraInterface } from '@src/domain/interfaces/indra';
import { VISUAL_CROSSING_API, WEATHER_API } from '@src/shared/constants';

@Injectable()
export class IndraHoursUseCase implements IIndraInterface.IIndraFindManyUseCase {
  private readonly logger = new Logger(IndraHoursUseCase.name);

  constructor(
    @Inject(WEATHER_API) private readonly weatherApi: IIndraInterface.IIndraFindManyUseCase,
    @Inject(VISUAL_CROSSING_API) private readonly visualCrossingApi: IIndraInterface.IIndraFindManyUseCase
  ) {}

  async execute(params?: IIndraInterface.Params): Promise<IndraEntity[]> {
    params?.setFinalDate();
    const startOfThisDay = params.initialDate?.getTime();
    const endOfThisDay = params.finalDate?.getTime();

    const [visualCrossingForecasts, weatherForecasts] = await Promise.all([this.visualCrossingApi.execute(), this.weatherApi.execute()]);

    const forecast = visualCrossingForecasts || weatherForecasts || [];

    if (!startOfThisDay && !endOfThisDay) return forecast;

    return forecast.filter((forecast) => forecast.timestamp >= startOfThisDay && forecast.timestamp <= endOfThisDay);
  }
}
