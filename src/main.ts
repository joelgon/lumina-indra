import cors from '@fastify/cors';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ResponseBodyInterceptor } from './shared/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), { bufferLogs: true });

  app.useGlobalInterceptors(new ResponseBodyInterceptor());
  app.register(cors, {
    origin: '*',
  });

  app.useLogger(app.get(Logger));

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
