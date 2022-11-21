import { UserModel } from '@classes';
import { PickType } from '@nestjs/swagger';

export class GetUserDto extends PickType(UserModel, ['id']) {}
