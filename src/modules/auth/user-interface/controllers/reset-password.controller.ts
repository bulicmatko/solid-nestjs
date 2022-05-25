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

import { ResetPasswordData } from "../inputs/reset-password.input";

@Controller("auth")
export class ResetPasswordController {
  constructor(
    private readonly eventEmitter: EventEmitter,
    private readonly prisma: PrismaService,
  ) {}

  @Post("reset-password")
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() data: ResetPasswordData): Promise<void> {
    console.log("Reset Password:", { data });
    throw new NotImplementedException();
  }
}
