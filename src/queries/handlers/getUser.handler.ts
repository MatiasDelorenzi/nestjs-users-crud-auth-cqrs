import { User } from '@entities';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUserQuery } from '@queries/implementations';
import { Repository } from 'typeorm';

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(query: GetUserQuery): Promise<User[]> {
    const {
      getUserDto: { id },
    } = query;
    const data = await this.userRepository.find({ where: { id } });

    data.map((user) => {
      delete user.password;
    });

    return data;
  }
}
