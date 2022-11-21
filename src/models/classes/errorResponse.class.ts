import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty()
  statusCode: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}
