import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WeatherApi } from '.';
import { WEATHER_API } from '@src/shared/constants';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        baseURL: process.env.WEATHER_API_URL,
      }),
    }),
  ],
  providers: [{ provide: WEATHER_API, useClass: WeatherApi }],
  exports: [WEATHER_API],
})
export class WeatherApiModule {}
