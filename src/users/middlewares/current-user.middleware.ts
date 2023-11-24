import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { User } from '../users.entity';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const { userId } = request.session || {};

    //*** Check userId is exist or not */
    if (userId) {
      const user = await this.usersService.findOne(userId);

      request.currentUser = user;
    }

    next();
  }
}
