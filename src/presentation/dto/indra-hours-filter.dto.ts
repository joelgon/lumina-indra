import { DateFormatUtil } from '@src/shared/utils/date-format.util';
import { Transform } from 'class-transformer';
import { IsOptional, IsDate } from 'class-validator';

export class IndraHoursFilterDto {
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => DateFormatUtil.createDate(value, '00:00:00'))
  initialDate?: Date;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => DateFormatUtil.createDate(value, '23:59:59'))
  finalDate?: Date;

  setFinalDate() {
    if (this.finalDate || !this.initialDate) return;

    this.finalDate = new Date(new Date(this.initialDate).setHours(23, 59, 59, 999));
  }
}
