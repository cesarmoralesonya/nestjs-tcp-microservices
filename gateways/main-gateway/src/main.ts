import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

const port = 5000;

async function bootstrap() {
  const gatewayApp = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  const config = new DocumentBuilder()
    .setTitle('main gateway nestjs tcp microservices')
    .setDescription('proof of concept microservice with tcp comunication')
    .setVersion('1.0')
    .addTag('services')
    .build();
  const document = SwaggerModule.createDocument(gatewayApp, config);
  SwaggerModule.setup('api', gatewayApp, document);

  console.log(`app listen on port: ${port}`);
  await gatewayApp.listen(port, '0.0.0.0');
}
bootstrap();
