import { Controller, Get, HttpCode, HttpStatus, Inject, Query, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IndraEntity } from '@src/domain/entities/indra.entity';
import { IIndraInterface } from '@src/domain/interfaces/indra';
import { IndraHoursFilterDto } from '@src/presentation/dto/indra-hours-filter.dto';
import { INDRA_HOURS } from '@src/shared/constants';

@ApiTags('Indra')
@Controller('indra')
export class IndraHoursController {
  constructor(@Inject(INDRA_HOURS) private readonly indraHoursUseCase: IIndraInterface.IIndraFindManyUseCase) {}

  @Get('hours')
  @ApiOkResponse({ type: IndraEntity, isArray: true, description: 'Get weather forecast for the next days' })
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: IndraHoursFilterDto.name, required: false, type: IndraHoursFilterDto, description: 'Filter by date' })
  async execute(@Query() query: IndraHoursFilterDto): Promise<IIndraInterface.ResponseMany> {
    return this.indraHoursUseCase.execute(query);
  }
}
