import { SignInUserDto } from '@dtos';
import { faker } from '@faker-js/faker';

const { internet } = faker;

export const signInUserDtoMock: SignInUserDto = {
  email: internet.email(),
  password: internet.password(),
};
