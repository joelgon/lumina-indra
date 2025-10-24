import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';

export class DocConfig {
  public static execute(): Omit<OpenAPIObject, 'paths'> {
    return new DocumentBuilder()
      .setTitle('Lumina Indra API')
      .setDescription(
        'Lightweight weather forecast microservice built with NestJS and Fastify. Named after Indra, the Hindu god of storms, it powers the Lumina Fest chatbot by fetching real-time data from public APIs like WeatherAPI and Visual Crossing.'
      )
      .setVersion('1.0')
      .addTag('Indra')
      .build();
  }
}
