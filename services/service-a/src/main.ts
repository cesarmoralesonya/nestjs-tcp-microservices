import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

import { Transport, TcpOptions } from '@nestjs/microservices';

const port = 3000;

async function bootstrap() {
  const mainApp = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  mainApp.connectMicroservice(
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: port,
      } as TcpOptions,
    },
    {
      inheritAppConfig: true,
    },
  );
  await mainApp.startAllMicroservices();
}
bootstrap();
