import { environment } from '@config';
import { genSaltSync, hashSync } from 'bcryptjs';

export const encryptPassword = (password: string): string => {
  const salt = genSaltSync(environment.SALT_ROUNDS);
  const hashedPassword = hashSync(password, salt);
  return hashedPassword;
};
