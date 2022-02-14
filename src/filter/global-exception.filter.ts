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
} from '@nestjs/common';
import { GqlContextType, GqlExceptionFilter } from '@nestjs/graphql';

import { Forbidden } from '../user-interface/outputs/forbidden.contract';
import { NotFound } from '../user-interface/outputs/not-found.contract';
import { BadRequestField } from '../user-interface/outputs/bad-request-field.contract';
import { BadRequest } from '../user-interface/outputs/bad-request.contract';

type Output = Forbidden | NotFound | BadRequest;

@Catch(HttpException)
export class GlobalExceptionFilter
  implements ExceptionFilter, GqlExceptionFilter
{
  catch(exception: HttpException, host: ArgumentsHost): Output {
    if (host.getType<GqlContextType>() === 'graphql') {
      if (exception instanceof ForbiddenException) {
        return new Forbidden({ message: exception.message });
      }

      if (exception instanceof NotFoundException) {
        return new NotFound({ message: exception.message });
      }

      if (exception instanceof BadRequestException) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response: any = exception.getResponse();

        if (
          response &&
          Array.isArray(response.message) &&
          response.message.every(
            (item: unknown) => item instanceof BadRequestField,
          )
        ) {
          return new BadRequest({
            message: exception.message,
            fields: response.message,
          });
        }

        return new BadRequest({ message: exception.message });
      }

      return exception;
    }

    if (host.getType<ContextType>() === 'http') {
      return host
        .switchToHttp()
        .getResponse()
        .status(exception.getStatus())
        .send(exception.getResponse());
    }

    throw new InternalServerErrorException('Unhandled arguments host type!');
  }
}
