import { signInUserDtoMock } from '@mocks';
import { SignInUserQuery } from '@queries/implementations';

describe('SignInUserQuery', () => {
  it('Should be initialized successfully', () => {
    const signInUserQuery = new SignInUserQuery(signInUserDtoMock);
    expect(signInUserQuery).toBeDefined();
    expect(signInUserQuery.signInDto).toBeDefined();
  });
});
