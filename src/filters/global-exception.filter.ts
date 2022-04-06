import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ContextType,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { GqlContextType, GqlExceptionFilter } from "@nestjs/graphql";

import { Forbidden } from "../user-interface/outputs/forbidden.output";
import { NotFound } from "../user-interface/outputs/not-found.output";
import {
  Unprocessable,
  UnprocessableField,
} from "../user-interface/outputs/unprocessable.output";

type Output = Forbidden | NotFound | Unprocessable;

@Catch(HttpException)
export class GlobalExceptionFilter
  implements ExceptionFilter, GqlExceptionFilter
{
  catch(exception: HttpException, host: ArgumentsHost): Output {
    if (host.getType<GqlContextType>() === "graphql") {
      if (exception instanceof ForbiddenException) {
        return new Forbidden({ message: exception.message });
      }

      if (exception instanceof NotFoundException) {
        return new NotFound({ message: exception.message });
      }

      if (exception instanceof UnprocessableEntityException) {
        const response = exception.getResponse();

        if (typeof response === "object" && "fields" in response) {
          return new Unprocessable({
            message: exception.message,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            fields: (response as any).fields,
          });
        }

        return new Unprocessable({ message: exception.message });
      }

      // Bad Request Exception is thrown by GlobalValidationPipe
      if (exception instanceof BadRequestException) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response: any = exception.getResponse();

        if (
          response &&
          Array.isArray(response.message) &&
          response.message.every(
            (item: unknown) => item instanceof UnprocessableField,
          )
        ) {
          return new Unprocessable({
            message: exception.message,
            fields: response.message,
          });
        }

        return new Unprocessable({ message: exception.message });
      }

      return exception;
    }

    if (host.getType<ContextType>() === "http") {
      return host
        .switchToHttp()
        .getResponse()
        .status(exception.getStatus())
        .send(exception.getResponse());
    }

    throw new InternalServerErrorException("Unhandled arguments host type!");
  }
}
