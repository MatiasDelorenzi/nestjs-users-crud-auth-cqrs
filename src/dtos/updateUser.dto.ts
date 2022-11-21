import { UserModel } from '@classes';
import { encryptPassword } from '@functions';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateUserDto extends PartialType(
  OmitType(UserModel, ['id', 'password']),
) {
  @ApiProperty()
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Transform(({ value }) => encryptPassword(value))
  password?: string;
}
