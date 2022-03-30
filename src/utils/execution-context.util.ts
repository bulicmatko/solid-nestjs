import {
  ContextType,
  ExecutionContext,
  InternalServerErrorException,
} from "@nestjs/common";
import { GqlContextType, GqlExecutionContext } from "@nestjs/graphql";

import { CurrentUser } from "../modules/auth/decorators/current-user.decorator";

interface Request {
  readonly user?: CurrentUser;
}

export interface Context {
  readonly req: Request;
}

export function getRequest(executionContext: ExecutionContext): Request {
  if (executionContext.getType<GqlContextType>() === "graphql") {
    const gqlExecutionContext = GqlExecutionContext.create(executionContext);
    const { req } = gqlExecutionContext.getContext();
    return req;
  }

  if (executionContext.getType<ContextType>() === "http") {
    const [req] = executionContext.getArgs();
    return req;
  }

  throw new InternalServerErrorException("Unknown execution context type!");
}

export function getRequestUser(req: Request): CurrentUser {
  if (!req.user) {
    throw new InternalServerErrorException(
      '"user" object not found in "ExecutionContext"!',
      'You probably used "@CurrentUser()" param decorator without "JwtAuthGuard".',
    );
  }

  return req.user;
}
