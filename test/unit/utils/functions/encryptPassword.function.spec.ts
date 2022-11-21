import { encryptPassword } from '@functions';

describe('Encrypt Password', () => {
  it('Should return a string', () => {
    const password = 'not_encrypted_password';
    const encryptedPassword = encryptPassword(password);

    expect(typeof encryptedPassword).toEqual('string');
    expect(password != encryptedPassword).toBeTruthy();
    expect(password.length < encryptedPassword.length).toBeTruthy();
  });
});
