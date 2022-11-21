import { ApiProperty } from '@nestjs/swagger';

class Data {
  @ApiProperty()
  token: string;
}

export class PostResponse {
  @ApiProperty()
  message: string;

  @ApiProperty()
  data?: Data;
}
