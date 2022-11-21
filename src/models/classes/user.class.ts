import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { PaymentMethod } from './paymentMethod.class';

export class UserModel {
  @ApiProperty()
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @ValidateNested({ each: true })
  @IsArray()
  paymentMethods: PaymentMethod[];

  @ApiProperty()
  @IsNumber()
  balance: number;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @IsDate()
  dateCreated: Date;

  @ApiProperty()
  @IsDate()
  dateUpdated: Date;
}
