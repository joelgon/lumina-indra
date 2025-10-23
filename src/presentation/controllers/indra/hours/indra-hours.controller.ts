import { Controller, Get, Inject, Query } from '@nestjs/common';
import { IIndraInterface } from '@src/domain/interfaces/indra';
import { IndraHoursFilterDto } from '@src/presentation/dto/indra-hours-filter.dto';
import { INDRA_HOURS } from '@src/shared/constants';

@Controller('indra')
export class IndraHoursController {
  constructor(@Inject(INDRA_HOURS) private readonly indraHoursUseCase: IIndraInterface.IIndraFindManyUseCase) {}

  @Get('hours')
  async execute(@Query() query: IndraHoursFilterDto): Promise<IIndraInterface.ResponseMany> {
    return this.indraHoursUseCase.execute(query);
  }
}
