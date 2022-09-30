import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';

@Injectable()
export class AppService {
  getHello(payload: { myData: string }): Observable<string> {
    return from([
      'Hello World! from service B express with payload.myData: ' +
        payload.myData,
    ]);
  }
}
