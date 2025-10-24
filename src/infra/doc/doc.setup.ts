import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { DocConfig } from './doc.config';

export class DocSetup {
  public static async execute(app: INestApplication) {
    const document = SwaggerModule.createDocument(app, DocConfig.execute(), {});

    const fastifyInstance = app.getHttpAdapter().getInstance();

    await fastifyInstance.register(require('@fastify/swagger'), {
      swagger: {
        info: {
          title: 'Lumina Indra API',
          description:
            'Lightweight weather forecast microservice built with NestJS and Fastify. Named after Indra, the Hindu god of storms, it powers the Lumina Fest chatbot by fetching real-time data from public APIs like WeatherAPI and Visual Crossing.',
          version: '1.0',
        },
      },
      staticCSP: true,
      transformStaticCSP: (header: string) => header,
      uiConfig: {
        docExpansion: 'list',
        deepLinking: false,
      },
    });

    SwaggerModule.setup('/api-doc', app, document);
  }
}
