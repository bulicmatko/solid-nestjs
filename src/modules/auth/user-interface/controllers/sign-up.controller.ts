import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { EventEmitter2 as EventEmitter } from "@nestjs/event-emitter";

import { PrismaService } from "../../../prisma/services/prisma.service";

import { SignUpData } from "../inputs/sign-up.input";

@Controller("auth")
export class SignUpController {
  constructor(
    private readonly eventEmitter: EventEmitter,
    private readonly prisma: PrismaService,
  ) {}

  @Post("sign-up")
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() data: SignUpData): Promise<void> {
    const user = await this.prisma.user.create({
      data: { email: data.email },
      select: { id: true, email: true },
    });

    this.eventEmitter.emit("user.signed-up", { user });
  }
}
