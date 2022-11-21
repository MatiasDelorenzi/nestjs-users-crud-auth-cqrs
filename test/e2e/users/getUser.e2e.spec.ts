import { CreateUserCommandHandler } from '@commands/handlers';
import { environment } from '@config';
import { UserController } from '@controllers';
import { User } from '@entities';
import * as request from 'supertest';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@services';
import { mockCreateUserDto } from '@mocks';
import {
  INVALID_PASSOWORD_MESSAGE,
  OK_SUCCESSFUL_OPERATION,
  USER_NOT_FOUND_MESSAGE,
} from '@constants';
import { GetUserQueryHandler, SignInUserQueryHandler } from '@queries/handlers';

describe('Get User', () => {
  let app: INestApplication;
  let httpServer: unknown;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      controllers: [UserController],
      providers: [
        UserService,
        CreateUserCommandHandler,
        GetUserQueryHandler
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        stopAtFirstError: true,
        forbidNonWhitelisted: true,
      }),
    );
    httpServer = app.getHttpServer();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should update a user and return an object with message and data with token', async () => {
    await request(httpServer).post('/user/signup').send(mockCreateUserDto);
    const { email, password } = mockCreateUserDto;
    const { body, status } = await request(httpServer)
      .get('/user/signin')
      .send({ email, password });
    expect(status).toEqual(HttpStatus.OK);
    expect(body).toBeDefined();
    expect(body.message).toEqual(OK_SUCCESSFUL_OPERATION);
    expect(body.data).toBeDefined();
    expect(body.data.token).toBeDefined();
    expect(typeof body.data.token).toEqual('string');
  });
  it('Should throw an error if password is incorrect', async () => {
    const { email } = mockCreateUserDto;
    await request(httpServer).post('/user/signup').send(mockCreateUserDto);
    const { body, status } = await request(httpServer)
      .get('/user/signin')
      .send({ email, password: 'incorrect-password' });
    expect(body.message).toEqual(INVALID_PASSOWORD_MESSAGE);
    expect(status).toEqual(HttpStatus.BAD_REQUEST);
  });
  it('Should throw a UserNotFound error if email is unexistent', async () => {
    const { password } = mockCreateUserDto;
    await request(httpServer).post('/user/signup').send(mockCreateUserDto);
    const { body, status } = await request(httpServer)
      .get('/user/signin')
      .send({ email: 'incorrect-email@incorrect.com', password });
    expect(status).toEqual(HttpStatus.NOT_FOUND);
    expect(body.message).toEqual(USER_NOT_FOUND_MESSAGE);
  });
});
