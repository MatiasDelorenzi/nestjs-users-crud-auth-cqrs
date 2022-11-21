import { faker } from '@faker-js/faker';
import { signToken } from '@functions';

describe('SignToken function', () => {
  it('Should return a string', () => {
    const id = faker.datatype.uuid();
    const token = signToken(id);
    expect(typeof token).toEqual('string');
  });
});
