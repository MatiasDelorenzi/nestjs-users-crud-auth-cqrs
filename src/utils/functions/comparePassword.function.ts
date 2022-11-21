import { InvalidPasswordException } from '@exceptions';
import { compare } from 'bcryptjs';
import { INVALID_PASSOWORD_MESSAGE } from '../constants/error.messages';

export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<null> => {
  const passwordMatch = await compare(password, hashedPassword);
  if (!passwordMatch) {
    throw new InvalidPasswordException(INVALID_PASSOWORD_MESSAGE);
  }
  return;
};
