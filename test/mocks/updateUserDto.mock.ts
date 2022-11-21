import { UpdateUserDto } from '@dtos';
import { PaymentType } from '@enums';
import { faker } from '@faker-js/faker';

const { datatype, random, name, internet } = faker;

export const updateUserDtoMock: UpdateUserDto = {
  id: datatype.uuid(),
  password: internet.password(),
  firstName: name.firstName(),
  lastName: name.lastName(),
  email: internet.email(),
  paymentMethods: [
    {
      type: PaymentType.CREDIT,
      name: random.words(),
    },
  ],
  balance: datatype.float(),
  isActive: datatype.boolean(),
};
