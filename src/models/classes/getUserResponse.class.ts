import { ApiProperty } from '@nestjs/swagger';
import { User } from '@entities';

export class GetUserResponse {
  @ApiProperty()
  message: string;

  @ApiProperty()
  data: User[];
}
