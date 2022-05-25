import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotImplementedException,
  Post,
} from "@nestjs/common";
import { EventEmitter2 as EventEmitter } from "@nestjs/event-emitter";

import { PrismaService } from "../../../../core/modules/prisma/services/prisma.service";

import { RequestPasswordResetData } from "../inputs/request-password-reset.input";

@Controller("auth")
export class RequestPasswordResetController {
  constructor(
    private readonly eventEmitter: EventEmitter,
    private readonly prisma: PrismaService,
  ) {}

  @Post("request-password-reset")
  @HttpCode(HttpStatus.OK)
  async requestPasswordReset(
    @Body() data: RequestPasswordResetData,
  ): Promise<void> {
    console.log("Request Password Reset:", { data });
    throw new NotImplementedException();
  }
}
