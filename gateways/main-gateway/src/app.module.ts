import { Module } from '@nestjs/common';
import { serviceAController } from './services/service-a.controller';
import {
  ClientProxyFactory,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'SERVICE_A_CLIENT', transport: Transport.TCP },
    ]),
  ],
  controllers: [serviceAController],
  providers: [
    {
      provide: 'SERVICE_A_CLIENT',
      useFactory: () => {
        return ClientProxyFactory.create({
          options: {
            port: 3001,
            host: '0.0.0.0',
          },
        });
      },
    },
  ],
})
export class AppModule {}
