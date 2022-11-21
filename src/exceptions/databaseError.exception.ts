import { InternalServerErrorException } from '@nestjs/common';

export class DatabaseError extends InternalServerErrorException {
  constructor(message) {
    super(message);
  }
}
