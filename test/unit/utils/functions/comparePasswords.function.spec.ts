import { INVALID_PASSOWORD_MESSAGE } from '@constants';
import { InvalidPasswordException } from '@exceptions';
import { faker } from '@faker-js/faker';
import { comparePassword } from '@functions';
import * as bcrypt from 'bcryptjs';

const { internet, random } = faker;

describe('comparePasswords function', () => {
  const password = internet.password();
  const hashPassword = random.alphaNumeric(60);
  it('Should return null if passwords match', async () => {
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
      return true;
    });
    const result = await comparePassword(password, hashPassword);
    expect(result).toBe(undefined);
  });
  it('Should throw an error if passwords do not match', async () => {
    await expect(comparePassword(password, '')).rejects.toThrowError(
      new InvalidPasswordException(INVALID_PASSOWORD_MESSAGE),
    );
  });
});
