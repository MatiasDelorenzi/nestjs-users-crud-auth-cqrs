import { UpdateUserCommand } from '@commands/implementations';
import { updateUserDtoMock } from '@mocks';

describe('UpdateUserCommand', () => {
  it('Should be instantiated successfully', () => {
    const updateUserCommand = new UpdateUserCommand(updateUserDtoMock);
    expect(updateUserCommand).toBeDefined();
    expect(updateUserCommand.updateUserDto).toBeDefined();
  });
});
