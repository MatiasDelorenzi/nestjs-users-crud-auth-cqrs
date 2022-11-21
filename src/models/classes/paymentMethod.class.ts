import { IsEnum, IsString } from 'class-validator';
import { PaymentType } from '@enums';

export class PaymentMethod {
  @IsEnum(PaymentType)
  type: PaymentType;

  @IsString()
  name: string;
}
