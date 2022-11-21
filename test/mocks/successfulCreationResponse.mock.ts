import { PostResponse } from '@classes';
import { OK_SUCCESSFUL_OPERATION } from '@constants';
import { faker } from '@faker-js/faker';

export const successfulCreationResponse: PostResponse = {
  message: OK_SUCCESSFUL_OPERATION,
  data: { token: faker.random.alphaNumeric(30) },
};
