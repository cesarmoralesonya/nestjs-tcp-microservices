import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';

@Controller('service-b')
@ApiTags('services')
export class serviceBController {
  private readonly _serviceBProxy: ClientProxy;

  constructor(@Inject('SERVICE_B_CLIENT') serviceBClient: ClientProxy) {
    this._serviceBProxy = serviceBClient;
  }

  @Get()
  getHello(): Observable<string> {
    return this._serviceBProxy.send('hello', { myData: 'hello from gateway' });
  }
}
