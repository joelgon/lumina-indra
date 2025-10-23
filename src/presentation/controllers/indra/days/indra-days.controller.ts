import { Controller, Get, Inject } from '@nestjs/common';
import { IIndraInterface } from '@src/domain/interfaces/indra';
import { INDRA_DAYS } from '@src/shared/constants';

@Controller('indra')
export class IndraDaysController {
  constructor(@Inject(INDRA_DAYS) private readonly indraDaysUseCase: IIndraInterface.IIndraFindManyUseCase) {}

  @Get('days')
  async execute() {
    return this.indraDaysUseCase.execute();
  }
}
