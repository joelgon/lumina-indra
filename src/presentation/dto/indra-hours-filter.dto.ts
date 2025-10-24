import { ApiProperty } from '@nestjs/swagger';
import { DateFormatUtil } from '@src/shared/utils/date-format.util';
import { Transform } from 'class-transformer';
import { IsOptional, IsDate } from 'class-validator';

export class IndraHoursFilterDto {
  @ApiProperty({
    example: '2023-10-05T00:00:00',
    description: 'initial date for filtering the weather data',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => DateFormatUtil.createDate(value, '00:00:00'))
  initialDate?: Date;

  @ApiProperty({
    example: '2023-10-05',
    description: 'final date for filtering the weather data',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => DateFormatUtil.createDate(value, '23:59:59'))
  finalDate?: Date;

  setFinalDate() {
    if (this.finalDate || !this.initialDate) return;

    this.finalDate = new Date(new Date(this.initialDate).setHours(23, 59, 59, 999));
  }
}
