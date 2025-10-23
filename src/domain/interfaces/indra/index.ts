import { IndraEntity } from '@src/domain/entities/indra.entity';
import { IndraHoursFilterDto } from '@src/presentation/dto/indra-hours-filter.dto';

export namespace IIndraInterface {
  export abstract class IIndraFindManyUseCase {
    abstract execute(params?: IIndraInterface.Params): Promise<IndraEntity[]>;
  }

  export abstract class IIndraFindOneUseCase {
    abstract execute(date: Date): Promise<IndraEntity>;
  }

  export type ResponseMany = IndraEntity[];

  export type ResponseOne = IndraEntity;

  export type Params = IndraHoursFilterDto;
}
