import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { PostResponse, ErrorResponse } from '@classes';

export const CreateUserDecorators = () => {
  return applyDecorators(
    ApiOperation({
      tags: ['User'],
      description: 'User microservice routes',
    }),
    ApiCreatedResponse({
      type: PostResponse,
      description: 'Created',
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
  );
};
