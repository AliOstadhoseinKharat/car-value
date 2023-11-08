import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class AppController {
  @Get()
  appInit() {
    return 'Hello World!';
  }
}
