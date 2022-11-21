import { ApiProperty } from '@nestjs/swagger';

export class PatchResponse {
  @ApiProperty()
  message: string;
}
