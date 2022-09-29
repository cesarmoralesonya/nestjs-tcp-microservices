import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, TcpOptions } from '@nestjs/microservices';

const port = 4000;

async function bootstrap() {
  const mainApp = await NestFactory.create(AppModule);
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
