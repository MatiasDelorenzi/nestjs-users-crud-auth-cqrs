import { CreateUserCommand } from '@commands/implementations';
import { mockCreateUserDto } from '@mocks';

describe('CreateUserCommand', () => {
  it('Should be initialized successfully', () => {
    const createUserCommand = new CreateUserCommand(mockCreateUserDto);
    expect(createUserCommand).toBeDefined();
    expect(createUserCommand.user).toBeDefined();
  });
});
