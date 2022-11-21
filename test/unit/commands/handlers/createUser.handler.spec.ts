import { CreateUserCommandHandler } from '@commands/handlers';
import { CreateUserCommand } from '@commands/implementations';
import { User } from '@entities';
import { mockCreateUserDto, userMock } from '@mocks';
import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CreateUserCommandHandler', () => {
  let createUserCommandHandler: CreateUserCommandHandler;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        CreateUserCommandHandler,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn().mockReturnValueOnce(userMock),
          },
        },
      ],
    }).compile();

    createUserCommandHandler = module.get<CreateUserCommandHandler>(
      CreateUserCommandHandler,
    );
  });

  it('Should return a token when called', async () => {
    const createUserCommand = new CreateUserCommand(mockCreateUserDto);
    const response = await createUserCommandHandler.execute(createUserCommand);
    expect(response).toBeDefined();
    expect(typeof response).toEqual('string');
  });
});
