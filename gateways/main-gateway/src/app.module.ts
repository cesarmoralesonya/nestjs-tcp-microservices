import { Module } from '@nestjs/common';
import { serviceAController } from './services/service-a.controller';
import { serviceBController } from './services/service-b.controller';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from './services/config/config.service';

@Module({
  imports: [],
  controllers: [serviceAController, serviceBController],
  providers: [
    ConfigService,
    {
      provide: 'SERVICE_A_CLIENT',
      useFactory: (configService: ConfigService) => {
        const serviceAConfig = configService.get('serviceA');
        return ClientProxyFactory.create(serviceAConfig);
      },
      inject: [ConfigService],
    },
    {
      provide: 'SERVICE_B_CLIENT',
      useFactory: (configService: ConfigService) => {
        const serviceBConfig = configService.get('serviceB');
        return ClientProxyFactory.create(serviceBConfig);
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
