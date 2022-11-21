import { UpdateUserDto } from '@dtos';

export class UpdateUserCommand {
  constructor(public updateUserDto: UpdateUserDto) {}
}
