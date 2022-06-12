import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('service-a')
export class serviceAController {
  private readonly _serviceAProxy: ClientProxy;

  constructor(@Inject('SERVICE_A_CLIENT') serviceAClient: ClientProxy) {
    this._serviceAProxy = serviceAClient;
  }

  @Get()
  getHello(): Observable<string> {
    return this._serviceAProxy.send('hello', {});
  }
}
