import { Injectable } from '@nestjs/common';
import { MICROSERVICE_OK_STATUS_MESSAGE } from '@constants';

@Injectable()
export class AppService {
  getHealth(): string {
    return MICROSERVICE_OK_STATUS_MESSAGE;
  }
}
