import { CreateUserCommand } from '@commands/implementations';
import { User } from '@entities';
import { signToken } from '@functions';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(command: CreateUserCommand): Promise<string> {
    const { user } = command;
    const { id } = await this.userRepository.save(user);
    const token = signToken(id);
    return token;
  }
}
