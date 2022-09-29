import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  private readonly serviceAHost = 'service-a';
  private readonly serviceBHost = 'service-b';

  constructor() {
    this.envConfig = {};
    this.envConfig.serviceA = {
      options: {
        port: 3000,
        host: this.serviceAHost,
      },
      transport: Transport.TCP,
    };
    this.envConfig.serviceB = {
      options: {
        port: 4000,
        host: this.serviceBHost,
      },
      transport: Transport.TCP,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
