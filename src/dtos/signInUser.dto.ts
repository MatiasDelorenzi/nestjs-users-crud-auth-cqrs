import { UserModel } from '@classes';
import { PickType } from '@nestjs/swagger';

export class SignInUserDto extends PickType(UserModel, ['email', 'password']) {}
