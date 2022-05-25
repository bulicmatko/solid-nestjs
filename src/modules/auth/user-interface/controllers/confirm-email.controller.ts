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

import { ConfirmEmailData } from "../inputs/confirm-email.input";

@Controller("auth")
export class ConfirmEmailController {
  constructor(
    private readonly eventEmitter: EventEmitter,
    private readonly prisma: PrismaService,
  ) {}

  @Post("confirm-email")
  @HttpCode(HttpStatus.OK)
  async confirmEmail(@Body() data: ConfirmEmailData): Promise<void> {
    console.log("Confirm Email:", { data });
    throw new NotImplementedException();
  }
}
