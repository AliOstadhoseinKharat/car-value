import { Module, MiddlewareConsumer, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Report } from './reports/Report.entity';
import { APP_PIPE } from '@nestjs/core';
const cookieSession = require('cookie-session');

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'cv.sqlite',
      entities: [User, Report],
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
  ],
})
export class AppModule {
  //*** Global middleware */
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ['dlksjflskdjflks'],
        }),
      )
      .forRoutes('*');
  }
}
