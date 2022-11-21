import { getUserDtoMock } from '@mocks';
import { GetUserQuery } from '@queries/implementations';

describe('GetUserQuery', () => {
  it('Should be instantiated successfully', () => {
    const getUserQuery = new GetUserQuery(getUserDtoMock);
    expect(getUserQuery).toBeDefined();
    expect(getUserQuery.getUserDto).toBeDefined();
  });
});
