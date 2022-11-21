import * as functions from '@functions';
import { UserController } from '@controllers';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '@services';
import {
  commandBusMock,
  deleteUserDtoMock,
  getUserDtoMock,
  mockCreateUserDto,
  queryBusMock,
  signInUserDtoMock,
  successfulCreationResponse,
  updateUserDtoMock,
  userMock,
} from '@mocks';
import {
  DatabaseError,
  InvalidPasswordException,
  UserNotFoundException,
} from '@exceptions';
import {
  INVALID_PASSOWORD_MESSAGE,
  OK_SUCCESSFUL_OPERATION,
  USER_NOT_FOUND_MESSAGE,
} from '@constants';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

describe('UserService', () => {
  let userService: UserService;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        { provide: QueryBus, useFactory: queryBusMock },
        { provide: CommandBus, useFactory: commandBusMock },
      ],
    }).compile();

    userService = app.get<UserService>(UserService);
    commandBus = app.get<CommandBus>(CommandBus);
    queryBus = app.get<QueryBus>(QueryBus);
  });

  describe('create', () => {
    it('Should return an object with message OK and data if user is created successfully', async () => {
      jest
        .spyOn(commandBus, 'execute')
        .mockResolvedValueOnce(successfulCreationResponse.data.token);
      const serviceResponse = await userService.create(mockCreateUserDto);
      expect(serviceResponse).toEqual(successfulCreationResponse);
    });
    it('should throw an error if save fails', async () => {
      jest
        .spyOn(commandBus, 'execute')
        .mockRejectedValueOnce(new DatabaseError('DATABASE_ERROR'));
      await expect(userService.create(mockCreateUserDto)).rejects.toThrowError(
        new DatabaseError('DATABASE_ERROR'),
      );
    });
  });

  describe('signIn', () => {
    it('should return an object with message: OK and data if the credentials are correct and the user is logged in succesfully', async () => {
      jest.spyOn(functions, 'comparePassword').mockResolvedValueOnce(null);
      jest.spyOn(queryBus, 'execute').mockResolvedValueOnce(userMock);
      const { message, data } = await userService.signIn(signInUserDtoMock);
      expect(message).toEqual(OK_SUCCESSFUL_OPERATION);
      expect(data).toHaveProperty('token');
    });

    it('Should throw an InvalidPasswordException if password is not correct', async () => {
      jest.spyOn(queryBus, 'execute').mockResolvedValueOnce(userMock);
      signInUserDtoMock.password = 'Incorrect password';
      await expect(userService.signIn(signInUserDtoMock)).rejects.toThrowError(
        new InvalidPasswordException(INVALID_PASSOWORD_MESSAGE),
      );
    });

    it('Should throw a UserNotFoundException if the user does not exist', async () => {
      jest
        .spyOn(queryBus, 'execute')
        .mockRejectedValueOnce(
          new UserNotFoundException(USER_NOT_FOUND_MESSAGE),
        );
      await expect(userService.signIn(signInUserDtoMock)).rejects.toThrowError(
        new UserNotFoundException(USER_NOT_FOUND_MESSAGE),
      );
    });
  });

  describe('get', () => {
    it('Should return an object with OK status message and array of users', async () => {
      jest.spyOn(queryBus, 'execute').mockResolvedValueOnce([userMock]);
      const { message, data } = await userService.get(getUserDtoMock);

      expect(message).toEqual(OK_SUCCESSFUL_OPERATION);
      expect(data).toEqual([userMock]);
    });
    it('Should throw a not found error if user does not exist', async () => {
      jest.spyOn(queryBus, 'execute').mockResolvedValueOnce([]);

      await expect(userService.get(getUserDtoMock)).rejects.toThrowError(
        new UserNotFoundException(USER_NOT_FOUND_MESSAGE),
      );
    });
  });

  describe('update', () => {
    it('Should return object with OK mnessage if update succeeds', async () => {
      jest.spyOn(queryBus, 'execute').mockResolvedValueOnce([userMock]);
      jest.spyOn(commandBus, 'execute').mockResolvedValueOnce(null);
      const serviceResponse = await userService.update(updateUserDtoMock);
      expect(serviceResponse).toEqual({ message: OK_SUCCESSFUL_OPERATION });
    });
    it('Should throw a UserNotFound error if the user does not exist', async () => {
      jest.spyOn(queryBus, 'execute').mockResolvedValueOnce([]);
      await expect(userService.update(updateUserDtoMock)).rejects.toThrow(
        new UserNotFoundException(USER_NOT_FOUND_MESSAGE),
      );
    });
  });

  describe('delete', () => {
    it('Should return a message with OK status message', async () => {
      jest.spyOn(queryBus, 'execute').mockResolvedValueOnce([userMock]);
      jest.spyOn(commandBus, 'execute').mockResolvedValueOnce(null);
      const serviceResponse = await userService.delete(deleteUserDtoMock);
      expect(serviceResponse).toEqual({ message: OK_SUCCESSFUL_OPERATION });
    });
    it('Should throw a UserNotFoundException if user do not exist', async () => {
      jest.spyOn(queryBus, 'execute').mockResolvedValueOnce([]);
      await expect(userService.delete(deleteUserDtoMock)).rejects.toThrow(
        new UserNotFoundException(USER_NOT_FOUND_MESSAGE),
      );
    });
  });
});
