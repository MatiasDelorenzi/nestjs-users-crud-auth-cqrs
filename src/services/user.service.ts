import { Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  DeleteUserDto,
  GetUserDto,
  SignInUserDto,
  UpdateUserDto,
} from '@dtos';
import { GetUserResponse, PatchResponse, PostResponse } from '@classes';
import { comparePassword, signToken } from '@functions';
import { OK_SUCCESSFUL_OPERATION, USER_NOT_FOUND_MESSAGE } from '@constants';
import { DatabaseError, UserNotFoundException } from '@exceptions';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateUserCommand,
  UpdateUserCommand,
} from '@commands/implementations';
import { GetUserQuery, SignInUserQuery } from '@queries/implementations';

@Injectable()
export class UserService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  async create(createUserDto: CreateUserDto): Promise<PostResponse> {
    try {
      const token = await this.commandBus.execute(
        new CreateUserCommand(createUserDto),
      );

      return {
        message: OK_SUCCESSFUL_OPERATION,
        data: { token },
      };
    } catch (error) {
      throw new DatabaseError(error.message);
    }
  }

  async signIn(credentials: SignInUserDto): Promise<PostResponse> {
    const { password, id } = await this.queryBus.execute(
      new SignInUserQuery(credentials),
    );

    await comparePassword(credentials.password, password);
    const token = signToken(id);

    return {
      message: OK_SUCCESSFUL_OPERATION,
      data: { token },
    };
  }

  async get(getUserDto: GetUserDto): Promise<GetUserResponse> {
    const data = await this.queryBus.execute(new GetUserQuery(getUserDto));

    if (!data.length) {
      throw new UserNotFoundException(USER_NOT_FOUND_MESSAGE);
    }

    return {
      message: OK_SUCCESSFUL_OPERATION,
      data,
    };
  }

  async update(updateUserDto: UpdateUserDto): Promise<PatchResponse> {
    const { id } = updateUserDto;

    const userExists = await this.queryBus.execute(new GetUserQuery({ id }));

    if (!userExists.length) {
      throw new UserNotFoundException(USER_NOT_FOUND_MESSAGE);
    }

    await this.commandBus.execute(new UpdateUserCommand(updateUserDto));

    return {
      message: OK_SUCCESSFUL_OPERATION,
    };
  }

  async delete(deleteUserDto: DeleteUserDto): Promise<PatchResponse> {
    const { id } = deleteUserDto;
    const userExists = await this.queryBus.execute(
      new GetUserQuery(deleteUserDto),
    );
    if (!userExists.length) {
      throw new UserNotFoundException(USER_NOT_FOUND_MESSAGE);
    }

    await this.commandBus.execute(
      new UpdateUserCommand({ id, isActive: false }),
    ); //Soft delete

    return {
      message: OK_SUCCESSFUL_OPERATION,
    };
  }
}
