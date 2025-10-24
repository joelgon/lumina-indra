import { ApiProperty } from '@nestjs/swagger';
import { DateFormatUtil } from '@src/shared/utils/date-format.util';
import { Transform } from 'class-transformer';
import { IsDate } from 'class-validator';

export class IndraMomentDto {
  @ApiProperty({
    example: '2023-10-05T00:00:00',
    description: 'initial date for filtering the weather data',
    type: String,
    required: false,
  })
  @IsDate()
  @Transform(({ value }) => DateFormatUtil.createDate(value, '00:00:00'))
  date: Date;
}
