import { PaymentMethod } from '@classes';
import { PaymentType } from '@enums';
import { faker } from '@faker-js/faker';

const { datatype, name, internet, random } = faker;

const paymentMethodMock: PaymentMethod = {
  type: PaymentType.CREDIT,
  name: random.words(),
};

export const userMock = {
  id: datatype.uuid(),
  firstName: name.firstName(),
  lastName: name.lastName(),
  email: internet.email(),
  password: internet.password(),
  paymentMethods: [paymentMethodMock],
  balance: datatype.number(),
  isActive: datatype.boolean(),
  dateCreated: String(datatype.datetime()),
  dateUpdated: String(datatype.datetime()),
};
