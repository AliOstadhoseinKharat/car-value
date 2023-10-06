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
  Session,
  Request
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { SigninUserDto } from './dtos/signin-user.dto';

@Controller('auth')
@serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) { }


  //** Get current loggedin user */ 
  @Get("/whoami")
  async whoAmI(@Request() request: Request, @Session() session: any) {
    //TODO here!
    console.log(request)
    const user = await this.usersService.findOne(session.userId);

    if (!user) {
      return "you aren't sign in"
    }

    return user;
  }

  //*** Signout user */
  @Post("/signout")
  signout(@Session() session: any) {
    session.userId = null;
    return "User signing out"
  }

  //*** Create user */
  @Post('/signup')
  async signUp(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body);

    //*** Session is set for signup users */
    session.userId = user.id;

    return user;
  }

  //*** Signin user */
  @Post('/signin')
  async signinUser(@Body() body: SigninUserDto, @Session() session: any) {
    const user = await this.authService.signin(body);

    //*** Session is set for logged in users */
    session.userId = user.id;

    return user;
  }

  //*** Find one user */
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    //? Find user
    const user = await this.usersService.findOne(parseInt(id));

    //? Check user found
    if (!user) {
      throw new NotFoundException('User not found !');
    }

    return user;
  }

  //*** Find all users */
  @Get('/')
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  //*** Update user */
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  //*** Delete one user */
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

}
