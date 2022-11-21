import { faker } from '@faker-js/faker';

const { datatype } = faker;

export const deleteUserDtoMock = {
  id: datatype.uuid(),
};
