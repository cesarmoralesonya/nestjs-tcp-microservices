import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public async getHello(): Promise<string> {
    return Promise.resolve(
      'Hello World! from service A fastify with env variable:' +
        process.env.MY_ENV,
    );
  }
}
