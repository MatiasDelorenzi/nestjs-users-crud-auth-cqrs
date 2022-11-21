import { Module } from '@nestjs/common';
import { AppController, UserController } from '@controllers';
import { AppService, UserService } from '@services';
import {
  CreateUserCommandHandler,
  UpdateUserCommandHandler,
} from '@commands/handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { User } from './models/entities/User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from './config/environment';
import { GetUserQueryHandler, SignInUserQueryHandler } from '@queries/handlers';
@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: environment.DATABASE_HOST,
      port: environment.DATABASE_PORT,
      username: environment.DATABASE_USERNAME,
      password: environment.DATABASE_PASSWORD,
      database: environment.DATABASE_NAME,
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    UserService,
    CreateUserCommandHandler,
    GetUserQueryHandler,
    SignInUserQueryHandler,
    UpdateUserCommandHandler,
  ],
})
export class AppModule {}
