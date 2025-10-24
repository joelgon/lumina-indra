import { Controller, Get, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IndraEntity } from '@src/domain/entities/indra.entity';
import { IIndraInterface } from '@src/domain/interfaces/indra';
import { INDRA_DAYS } from '@src/shared/constants';

@ApiTags('Indra')
@Controller('indra')
export class IndraDaysController {
  constructor(@Inject(INDRA_DAYS) private readonly indraDaysUseCase: IIndraInterface.IIndraFindManyUseCase) {}

  @Get('days')
  @ApiOkResponse({ type: IndraEntity, isArray: true, description: 'Get weather forecast for the next days' })
  @HttpCode(HttpStatus.OK)
  async execute() {
    return this.indraDaysUseCase.execute();
  }
}
