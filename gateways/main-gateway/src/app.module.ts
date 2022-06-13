import { Module } from '@nestjs/common';
import { serviceAController } from './services/service-a.controller';
import { serviceBController } from './services/service-b.controller';
import {
  ClientProxyFactory,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'SERVICE_A_CLIENT', transport: Transport.TCP },
      { name: 'SERVICE_B_CLIENT', transport: Transport.TCP },
    ]),
  ],
  controllers: [serviceAController, serviceBController],
  providers: [
    {
      provide: 'SERVICE_A_CLIENT',
      useFactory: () => {
        return ClientProxyFactory.create({
          options: {
            port: 3000,
            host: '0.0.0.0',
          },
        });
      },
    },
    {
      provide: 'SERVICE_B_CLIENT',
      useFactory: () => {
        return ClientProxyFactory.create({
          options: {
            port: 4000,
            host: '0.0.0.0',
          },
        });
      },
    },
  ],
})
export class AppModule {}
