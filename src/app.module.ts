import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule, Params } from 'nestjs-pino';
import { LOGGER_CONFIG } from './shared/constants';
import { ConfigModule } from './infra/config/config.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRootAsync({
      inject: [LOGGER_CONFIG],
      useFactory: (config: Params) => config,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
