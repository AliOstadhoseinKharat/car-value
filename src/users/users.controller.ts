import {
  Controller,
  Body,
  Post,
  Get,
  Query,
  Param,
  Delete,
  Patch,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';

@Controller('auth')
export class UsersController {

  constructor(private usersService: UsersService) { }

  //*** Create user */
  @Post('/signup')
  signUp(@Body() body: CreateUserDto) {
    this.usersService.create(body)
  }


  //*** Find one user */
  @Get('/:id')
  @UseInterceptors(SerializeInterceptor)
  async findUser(@Param('id') id: string) {

    console.log("Interceptor handler is running")

    //? Find user
    const user = await this.usersService.findOne(parseInt(id))

    //? Check user found
    if (!user) {
      throw new NotFoundException("User not found !")
    }

    return user;

  }

  //*** Find all users */
  @Get('/')
  @UseInterceptors(SerializeInterceptor)
  findAllUsers(@Query('email') email: string) {
    console.log("Interceptor handler is running")

    return this.usersService.find(email);
  }


  //*** Update user */
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {

    return this.usersService.update(parseInt(id), body)

  }



  //*** Delete one user */
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id))
  }
}
