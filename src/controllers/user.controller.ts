import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from '@services';
import {
  CreateUserDto,
  DeleteUserDto,
  GetUserDto,
  SignInUserDto,
  UpdateUserDto,
} from '@dtos';
import { GetUserResponse, PatchResponse, PostResponse } from '@classes';
import {
  CreateUserDecorators,
  DeleteUserDecorator,
  GetUserDecorator,
  SignInUserDecorator,
  UpdateUserDecorator,
} from '@decorators';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  @CreateUserDecorators()
  async create(@Body() createUserDto: CreateUserDto): Promise<PostResponse> {
    return await this.userService.create(createUserDto);
  }

  @Get('/signin')
  @SignInUserDecorator()
  async signin(@Body() credentials: SignInUserDto): Promise<PostResponse> {
    return await this.userService.signIn(credentials);
  }

  @Get()
  @GetUserDecorator()
  async get(@Query() getUserDto: GetUserDto): Promise<GetUserResponse> {
    return await this.userService.get(getUserDto);
  }

  @Patch()
  @UpdateUserDecorator()
  async update(@Body() updateUserDto: UpdateUserDto): Promise<PatchResponse> {
    return await this.userService.update(updateUserDto);
  }

  @Delete()
  @DeleteUserDecorator()
  async delete(@Query() deleteUserDto: DeleteUserDto): Promise<PatchResponse> {
    return this.userService.delete(deleteUserDto);
  }
}
