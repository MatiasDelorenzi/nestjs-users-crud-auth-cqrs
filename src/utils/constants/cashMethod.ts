import { PaymentMethod } from '@classes';
import { PaymentType } from '@enums';

export const cashMethod: PaymentMethod = {
  type: PaymentType.CASH,
  name: 'Cash',
};
