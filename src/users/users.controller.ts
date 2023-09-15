import { Controller, Body, Post, Get } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
@Controller('auth')
export class UsersController {

  constructor(private usersService: UsersService) { }

  @Post('/signup')
  signUp(@Body() body: CreateUserDto) {

    this.usersService.create(body)

  }
}
