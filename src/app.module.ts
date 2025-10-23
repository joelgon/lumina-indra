import { Module } from '@nestjs/common';
import { LoggerModule, Params } from 'nestjs-pino';
import { INDRA_DAYS, INDRA_HOURS, INDRA_MOMENT, LOGGER_CONFIG } from './shared/constants';
import { ConfigModule } from './infra/config/config.module';
import { HttpModule } from './infra/http/http.module';
import { IndraDaysUseCase } from './application/indra/days/indra-days.use-case';
import { IndraDaysController } from './presentation/controllers/indra/days/indra-days.controller';
import { IndraHoursUseCase } from './application/indra/hours/indra-hours.use-case';
import { IndraHoursController } from './presentation/controllers/indra/hours/indra-hours.controller';
import { IndraMomentUseCase } from './application/indra/moment/indra-moment.use-case';
import { IndraMomentController } from './presentation/controllers/indra/moment/indra-moment.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRootAsync({
      inject: [LOGGER_CONFIG],
      useFactory: (config: Params) => config,
    }),
    HttpModule,
  ],
  controllers: [IndraDaysController, IndraHoursController, IndraMomentController],
  providers: [
    { provide: INDRA_DAYS, useClass: IndraDaysUseCase },
    { provide: INDRA_HOURS, useClass: IndraHoursUseCase },
    { provide: INDRA_MOMENT, useClass: IndraMomentUseCase },
  ],
})
export class AppModule {}
