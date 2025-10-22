import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { LoggerConfig } from './logger.config';
import { LOGGER_CONFIG } from '@src/shared/constants';

@Module({})
export class ConfigModule {
  static forRoot(): DynamicModule {
    return {
      module: ConfigModule,
      global: true,
      imports: [NestConfigModule.forRoot({ envFilePath: '.env' })],
      providers: [
        LoggerConfig,
        {
          provide: LOGGER_CONFIG,
          useFactory: (config: LoggerConfig) => config.execute,
          inject: [LoggerConfig],
        },
      ],
      exports: [LOGGER_CONFIG],
    };
  }
}
