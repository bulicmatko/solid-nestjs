import {
  ContextType,
  ExecutionContext,
  InternalServerErrorException,
} from "@nestjs/common";
import { GqlContextType, GqlExecutionContext } from "@nestjs/graphql";

interface CurrentUser {
  readonly id: string;
  readonly isAdmin: boolean;
  readonly subUserIds: string[];
  readonly permissions: string[];
}

interface Request {
  readonly user: CurrentUser;
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
