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
import { OK_SUCCESSFUL_OPERATION } from '@constants';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        { provide: CommandBus, useFactory: commandBusMock },
        { provide: QueryBus, useFactory: queryBusMock },
      ],
    }).compile();

    userController = app.get<UserController>(UserController);
    userService = app.get<UserService>(UserService);
  });

  describe('POST /signup', () => {
    it('should return an object with OK status message and data', async () => {
      jest
        .spyOn(userService, 'create')
        .mockResolvedValueOnce(successfulCreationResponse);
      const controllerResponse = await userController.create(mockCreateUserDto);

      expect(controllerResponse).toEqual(successfulCreationResponse);
    });
  });

  describe('GET /signin', () => {
    it('should return an object with OK status message and data with token', async () => {
      jest
        .spyOn(userService, 'signIn')
        .mockResolvedValueOnce(successfulCreationResponse);
      const controllerResponse = await userController.signin(signInUserDtoMock);

      expect(controllerResponse).toEqual(successfulCreationResponse);
    });
  });

  describe('GET user', () => {
    it('Should return an object with message and data if user exists', async () => {
      const expectedResponse = {
        message: OK_SUCCESSFUL_OPERATION,
        data: [userMock],
      };
      jest
        .spyOn(userService, 'get')
        .mockResolvedValueOnce(expectedResponse as never);

      const controllerResponse = await userController.get(getUserDtoMock);

      expect(controllerResponse).toEqual(expectedResponse);
    });
  });

  describe('PATCH user', () => {
    it('Should return an object with OK status message if user is updated correctly', async () => {
      const serviceResponse = {
        message: OK_SUCCESSFUL_OPERATION,
      };
      jest.spyOn(userService, 'update').mockResolvedValueOnce(serviceResponse);
      const controllerResponse = await userController.update(updateUserDtoMock);
      expect(controllerResponse).toEqual(serviceResponse);
    });
  });

  describe('DELETE user', () => {
    it('should return an object with ok status message', async () => {
      const serviceResponse = { message: OK_SUCCESSFUL_OPERATION };
      jest.spyOn(userService, 'delete').mockResolvedValueOnce(serviceResponse);
      const controllerResponse = await userController.delete(deleteUserDtoMock);
      expect(controllerResponse).toEqual(serviceResponse);
    });
  });
});
