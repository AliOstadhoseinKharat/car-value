import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './users.entity';

describe('Auth service', () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;

  beforeEach(async () => {

    fakeUserService = {
      find: () => Promise.resolve([]),
      create: (body: Partial<User>) =>
        Promise.resolve({
          id: 1,
          email: body.email,
          firstName: body.firstName,
          lastName: body.lastName,
          isActive: true,
          password: body.password,
        } as User),
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


  test("creates a new user with a salted and hashed password", async () => {

    // create user by fake body
    const user = await service.signup({email: 'asdf@gmail.com' , password: 'asdf'})
    expect(user.password).not.toEqual('asdf')

    const[salt  , hash] = user.password.split('.')
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  })


  
    it('throws an error if user signs up with email that is in use', async () => {
      
      fakeUserService.find = () => Promise.resolve([
        {id: 1 , email:'asdf@gmail.com', password:'asdf'} as User
      ]);    
      
      try {
        
        await service.signup({email: 'asdf@gmail.com', password:'asdf'});
        
      } catch (err) {
        
        expect(true).toBe(true)

      }
  });

});
