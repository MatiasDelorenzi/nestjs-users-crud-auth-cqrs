import { CreateUserDto } from '@dtos';
import { faker } from '@faker-js/faker';

const { internet, random } = faker;

export const mockCreateUserDto: CreateUserDto = {
  firstName: random.word(),
  lastName: random.word(),
  email: internet.email(),
  password: internet.password(),
};
