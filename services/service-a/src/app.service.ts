import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';

@Injectable()
export class AppService {
  getHello(): Observable<string> {
    return from(['Hello World! from service A fastify']);
  }
}
