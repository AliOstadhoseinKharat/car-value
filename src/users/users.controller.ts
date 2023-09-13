import { Controller, Body, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
@Controller('auth')
export class UsersController {
  @Post('/signup')
  signUp(@Body() body: CreateUserDto) {
    console.log(body);
  }
}
