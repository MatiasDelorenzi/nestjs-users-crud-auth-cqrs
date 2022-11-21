import { UserModel } from '@classes';
import { encryptPassword } from '@functions';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto extends OmitType(UserModel, [
  'id',
  'paymentMethods',
  'balance',
  'isActive',
  'dateCreated',
  'dateUpdated',
]) {
  @ApiProperty()
  @Transform(({ value }) => {
    return encryptPassword(value);
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
