import { Controller, Get, HttpCode, HttpStatus, Inject, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IndraEntity } from '@src/domain/entities/indra.entity';
import { IIndraInterface } from '@src/domain/interfaces/indra';
import { IndraMomentDto } from '@src/presentation/dto/indra-moment.dto';
import { INDRA_MOMENT } from '@src/shared/constants';

@ApiTags('Indra')
@Controller('indra')
export class IndraMomentController {
  constructor(@Inject(INDRA_MOMENT) private readonly indraMomentUseCase: IIndraInterface.IIndraFindOneUseCase) {}

  @Get('moment')
  @ApiOkResponse({ type: IndraEntity, description: 'Get weather forecast for the next days' })
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: IndraMomentDto.name, required: false, type: IndraMomentDto, description: 'Filter by date' })
  async execute(@Query() query: IndraMomentDto) {
    return this.indraMomentUseCase.execute(query.date);
  }
}
