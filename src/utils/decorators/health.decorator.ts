import { applyDecorators } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { MICROSERVICE_OK_STATUS_MESSAGE } from '../constants';

export const HealthDecorators = () => {
  return applyDecorators(
    ApiOperation({
      tags: ['Health'],
      description: 'Checks microservice health',
    }),
    ApiOkResponse({
      schema: { example: MICROSERVICE_OK_STATUS_MESSAGE },
      description: 'Microservice works',
    }),
    ApiInternalServerErrorResponse({
      description: 'Connection refused with the MS',
    }),
  );
};
