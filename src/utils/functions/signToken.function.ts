import { environment } from '@config';
import { sign } from 'jsonwebtoken';

export const signToken = (id: string): string => {
  return sign({ id }, environment.AUTH_TOKEN_SECRET, {
    expiresIn: 3600, //1 hour
  });
};
