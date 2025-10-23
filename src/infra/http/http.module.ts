import { Module } from '@nestjs/common';
import { WeatherApiModule } from './weather-api/weather-api.module';
import { VisualCrossingModule } from './visual-crossing/visual-crossing.module';

@Module({
  imports: [WeatherApiModule, VisualCrossingModule],
  exports: [WeatherApiModule, VisualCrossingModule],
})
export class HttpModule {}
