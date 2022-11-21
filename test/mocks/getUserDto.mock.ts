import { GetUserDto } from '@dtos';
import { faker } from '@faker-js/faker';

const { datatype } = faker;

export const getUserDtoMock: GetUserDto = {
  id: datatype.uuid(),
};
