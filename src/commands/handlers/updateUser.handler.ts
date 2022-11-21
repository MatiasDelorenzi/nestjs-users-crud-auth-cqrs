import { UpdateUserCommand } from '@commands/implementations';
import { User } from '@entities';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler
  implements ICommandHandler<UpdateUserCommand>
{
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(command: UpdateUserCommand): Promise<void> {
    const {
      updateUserDto: { id, ...update },
    } = command;
    await this.userRepository.update({ id }, update);
    return;
  }
}
