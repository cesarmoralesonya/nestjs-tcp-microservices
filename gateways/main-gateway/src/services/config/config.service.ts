import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  private readonly serviceAHost =
    process.env.NODE_ENV === 'production' ? 'service-a' : '0.0.0.0';
  private readonly serviceBHost =
    process.env.NODE_ENV === 'production' ? 'service-b' : '0.0.0.0';

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