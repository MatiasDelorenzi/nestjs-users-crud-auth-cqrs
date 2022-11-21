import { ErrorResponse, GetUserResponse } from '@classes';
import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';

export const GetUserDecorator = () => {
  return applyDecorators(
    ApiOperation({
      tags: ['User'],
      description: 'User microservice routes',
    }),
    ApiOkResponse({
      type: GetUserResponse,
      description: 'Users found',
    }),
    ApiInternalServerErrorResponse({
      type: ErrorResponse,
      description: 'Database error',
    }),
    ApiBadRequestResponse({
      type: ErrorResponse,
      description: 'BadRequest',
    }),
    ApiConflictResponse({
      type: ErrorResponse,
      description: 'Conflict',
    }),
    ApiInternalServerErrorResponse({
      type: ErrorResponse,
      description: 'Server error',
    }),
  );
};
