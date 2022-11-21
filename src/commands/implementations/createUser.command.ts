import { CreateUserDto } from '@dtos';

export class CreateUserCommand {
  constructor(public user: CreateUserDto) {}
}
