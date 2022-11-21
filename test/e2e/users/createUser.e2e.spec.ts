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
import { OK_SUCCESSFUL_OPERATION } from '@constants';

describe('Create User', () => {
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
      providers: [UserService, CreateUserCommandHandler],
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

  it('Should create an user and return an object with message and data with token', async () => {
    const { body, status } = await request(httpServer)
      .post('/user/signup')
      .send(mockCreateUserDto);
    expect(body.message).toEqual(OK_SUCCESSFUL_OPERATION);
    expect(body.data).toBeDefined();
    expect(body.data.token).toBeDefined();
    expect(typeof body.data.token).toEqual('string');
    expect(status).toEqual(HttpStatus.CREATED);
  });
  it('Should throw an error if the body is empty', async () => {
    const { body, status } = await request(httpServer)
      .post('/user/signup')
      .send({});
    expect(status).toEqual(HttpStatus.BAD_REQUEST);
    expect(body).toBeDefined();
    expect(body.message).toBeDefined();
  });
});
