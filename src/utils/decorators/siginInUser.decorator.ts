import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { PostResponse, ErrorResponse } from '@classes';

export const SignInUserDecorator = () => {
  return applyDecorators(
    ApiOperation({
      tags: ['User'],
      description: 'User microservice routes',
    }),
    ApiOkResponse({
      type: PostResponse,
      description: 'Logged In',
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
