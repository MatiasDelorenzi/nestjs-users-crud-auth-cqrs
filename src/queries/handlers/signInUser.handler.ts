import { USER_NOT_FOUND_MESSAGE } from '@constants';
import { User } from '@entities';
import { UserNotFoundException } from '@exceptions';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInUserQuery } from '@queries/implementations';
import { Repository } from 'typeorm';

@QueryHandler(SignInUserQuery)
export class SignInUserQueryHandler implements IQueryHandler<SignInUserQuery> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(query: SignInUserQuery): Promise<User> {
    const {
      signInDto: { email },
    } = query;
    const userFound = await this.userRepository.findOne({
      where: { email },
    });

    if (!userFound) {
      throw new UserNotFoundException(USER_NOT_FOUND_MESSAGE);
    }

    return userFound;
  }
}
