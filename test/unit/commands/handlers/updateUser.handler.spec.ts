import { UpdateUserCommandHandler } from '@commands/handlers';
import { UpdateUserCommand } from '@commands/implementations';
import { User } from '@entities';
import { updateUserDtoMock } from '@mocks';
import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UpdateUserCommandHandler', () => {
  let updateUserCommandHandler: UpdateUserCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        UpdateUserCommandHandler,
        {
          provide: getRepositoryToken(User),
          useValue: {
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    updateUserCommandHandler = module.get<UpdateUserCommandHandler>(
      UpdateUserCommandHandler,
    );
  });

  it('Should not return anything if everything update success', async () => {
    const updateUserCommand = new UpdateUserCommand(updateUserDtoMock);
    const handlerResponse = await updateUserCommandHandler.execute(
      updateUserCommand,
    );
    expect(handlerResponse).toBeUndefined();
  });
});
