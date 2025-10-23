import { DateFormatUtil } from '@src/shared/utils/date-format.util';
import { Transform } from 'class-transformer';
import { IsDate } from 'class-validator';

export class IndraMomentDto {
  @IsDate()
  @Transform(({ value }) => DateFormatUtil.createDate(value, '00:00:00'))
  date: Date;
}
