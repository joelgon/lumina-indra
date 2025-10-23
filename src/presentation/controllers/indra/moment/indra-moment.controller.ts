import { Controller, Get, Inject, Query } from '@nestjs/common';
import { IIndraInterface } from '@src/domain/interfaces/indra';
import { IndraMomentDto } from '@src/presentation/dto/indra-moment.dto';
import { INDRA_MOMENT } from '@src/shared/constants';

@Controller('indra')
export class IndraMomentController {
  constructor(@Inject(INDRA_MOMENT) private readonly indraMomentUseCase: IIndraInterface.IIndraFindOneUseCase) {}

  @Get('moment')
  async execute(@Query() query: IndraMomentDto) {
    return this.indraMomentUseCase.execute(query.date);
  }
}
