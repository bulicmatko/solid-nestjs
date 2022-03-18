import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotImplementedException,
  Post,
} from "@nestjs/common";
import { EventEmitter2 as EventEmitter } from "@nestjs/event-emitter";

import { PrismaService } from "../../../prisma/services/prisma.service";

import { RequestEmailConfirmationData } from "../inputs/request-email-confirmation.input";

@Controller("auth")
export class RequestEmailConfirmationController {
  constructor(
    private readonly eventEmitter: EventEmitter,
    private readonly prisma: PrismaService,
  ) {}

  @Post("request-email-confirmation")
  @HttpCode(HttpStatus.OK)
  async requestEmailConfirmation(
    @Body() data: RequestEmailConfirmationData,
  ): Promise<void> {
    console.log("Request Email Confirmation:", { data });
    throw new NotImplementedException();
  }
}
