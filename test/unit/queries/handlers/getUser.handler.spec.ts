import { User } from '@entities';
import { getUserDtoMock, userMock } from '@mocks';
import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GetUserQueryHandler } from '@queries/handlers';
import { GetUserQuery } from '@queries/implementations';

describe('GetUserQueryHandler', () => {
  let getUserQueryHandler: GetUserQueryHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        GetUserQueryHandler,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockReturnValueOnce([userMock]),
          },
        },
      ],
    }).compile();

    getUserQueryHandler = module.get<GetUserQueryHandler>(GetUserQueryHandler);
  });

  it('Should return an array of users when found', async () => {
    const getUserQuery = new GetUserQuery(getUserDtoMock);
    const response = await getUserQueryHandler.execute(getUserQuery);
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...expectedUser } = userMock;
    expect(response).toEqual([expectedUser]);
  });
});
