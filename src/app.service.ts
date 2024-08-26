import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    const data = 'Hello World!';
    return { data };
  }
}
