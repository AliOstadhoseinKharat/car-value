import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';


const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(body: Partial<User>) {
    //*** See if email in use */
    const users = await this.usersService.find(body?.email);

    if (users.length) {
      throw new BadRequestException('email in use');
    }

    //*** Hash the users password */

    //*** Generate a salt */
    const salt = randomBytes(8).toString('hex');

    //*** Hash the password and salt together */
    const hash = (await scrypt(body?.password, salt, 32)) as Buffer;

    //*** Join the hashed result the salt together  */
    const result = salt + '.' + hash.toString('hex');

    //*** change password in body request to hash salt password result  */
    body.password = result;

    //*** Create a new user and save it */
    const user = this.usersService.create(body);

    //*** return user */
    return user;
  }

  async signin(body: Partial<User>) {
    //*** Get body content */
    const email: string = body.email;
    const password: string = body.password;

    //*** Find user by email (use destructuring for get user object) */
    const [user] = await this.usersService.find(email);

    //*** Check user is in DB */
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    //*** Get hash and salt from user's password */
    const [salt, storedHash] = user.password.split('.');

    
    //*** Hash password in body content */
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //**** Check storeHash and new hash is same */
    if (!(hash.toString('hex') === storedHash)) {
      throw new BadRequestException('The password is wrong!');
    }

    //*** return user */
    return user;
  }
}
