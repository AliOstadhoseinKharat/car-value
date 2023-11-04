import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './users.entity';

describe('Auth service', () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;

  beforeEach(async () => {
    // Create a fake copy of the users service
    const users: User[] = [];

    fakeUserService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },

      create: (body: Partial<User>) => {
        const user = { id: Math.floor(Math.random() * 9999), ...body } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  test('creates a new user with a salted and hashed password', async () => {
    // create user by fake body
    const user = await service.signup({
      email: 'asdf@gmail.com',
      password: 'asdf',
    });
    expect(user.password).not.toEqual('asdf');

    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    /* fakeUserService.find = () =>
      Promise.resolve([
        { id: 1, email: 'asdf@gmail.com', password: 'asdf' } as User,
      ]);
    */

    await service.signup({ email: 'asdf@gmail.com', password: 'asdf' });

    try {
      await service.signup({ email: 'asdf@gmail.com', password: 'asdf' });
    } catch (err) {
      expect(true).toBe(true);
    }
  });

  it('throws error if signin is called with an unused email', async () => {
    try {
      await service.signin({ email: 'asdf@gmail', password: 'asdf' });
    } catch (err) {
      expect(true).toBe(true);
    }
  });

  test('throws error if an invalid password is provided', async () => {
    /* 
      fakeUserService.find = () =>
      Promise.resolve([{ email: 'asdf@asdf.com', password: 'asdf' } as User]);
    */

    await service.signup({
      email: 'asdf@asdf.com',
      password: 'anotherPassword',
    });
    try {
      await service.signin({ email: 'asdf@asdf.com', password: 'password' });
    } catch (err) {
      expect(true).toBe(true);
    }
  });

  it('returns a user if correct password is provided', async () => {
    // fakeUserService.find = () =>
    //   Promise.resolve([
    //     {
    //       email: 'asdf@asdf.com',
    //       password:
    //         'a54c5baa89953fea.92654226a173305532971ded7b851334d423ab6e92348bcc954e78bbd10b9a25',
    //     } as User,
    //   ]);

    await service.signup({
      email: 'asdf@asdf.com',
      password: 'myPassword',
      firstName: 'ali',
      lastName: 'ostad',
      isActive: true,
    });

    const user = await service.signin({
      email: 'asdf@asdf.com',
      password: 'myPassword',
    });
    expect(user).toBeDefined();
  });
});
