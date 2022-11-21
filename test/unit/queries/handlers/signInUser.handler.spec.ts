import { User } from '@entities';
import { signInUserDtoMock, userMock } from '@mocks';
import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SignInUserQueryHandler } from '@queries/handlers';
import { SignInUserQuery } from '@queries/implementations';

describe('SignInUserQueryHandler', () => {
  let signInUserQueryHandler: SignInUserQueryHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        SignInUserQueryHandler,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockResolvedValueOnce(userMock),
          },
        },
      ],
    }).compile();

    signInUserQueryHandler = module.get<SignInUserQueryHandler>(
      SignInUserQueryHandler,
    );
  });

  it('Should return a user when successfully logged in', async () => {
    const signInUserQuery = new SignInUserQuery(signInUserDtoMock);
    const handlerResponse = await signInUserQueryHandler.execute(
      signInUserQuery,
    );
    expect(handlerResponse).toEqual(userMock);
  });
});
