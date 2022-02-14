import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';

import { getRequest } from '../../../utils/execution-context.util';

export interface CurrentUser {
  readonly id: number;
  readonly isAdmin: boolean;
  readonly subUserIds: number[];
  readonly permissions: string[];
}

export const CurrentUser = createParamDecorator(
  (data: unknown, executionContext: ExecutionContext): CurrentUser => {
    const { user } = getRequest(executionContext);

    if (!user) {
      throw new InternalServerErrorException(
        '"user" object not found in "ExecutionContext"!',
        'You probably used "@CurrentUser()" param decorator without "JwtAuthGuard".',
      );
    }

    return user;
  },
);
