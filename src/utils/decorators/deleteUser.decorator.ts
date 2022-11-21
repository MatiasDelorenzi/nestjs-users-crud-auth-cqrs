import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ErrorResponse, PatchResponse } from '@classes';

export const DeleteUserDecorator = () => {
  return applyDecorators(
    ApiOperation({
      tags: ['User'],
      description: 'User microservice routes',
    }),
    ApiOkResponse({
      type: PatchResponse,
      description: 'Updated',
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
    ApiNotFoundResponse({
      type: ErrorResponse,
      description: 'NotFound',
    }),
  );
};
