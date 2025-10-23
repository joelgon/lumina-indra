import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { VISUAL_CROSSING_API } from '@src/shared/constants';
import { VisualCrossing } from '.';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        baseURL: process.env.VISUAL_CROSSING_API_URL,
      }),
    }),
  ],
  providers: [{ provide: VISUAL_CROSSING_API, useClass: VisualCrossing }],
  exports: [VISUAL_CROSSING_API],
})
export class VisualCrossingModule {}
