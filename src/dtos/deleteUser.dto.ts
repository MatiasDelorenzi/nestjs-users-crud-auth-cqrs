import { UserModel } from '@classes';
import { PickType } from '@nestjs/swagger';

export class DeleteUserDto extends PickType(UserModel, ['id']) {}
