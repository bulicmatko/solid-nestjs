import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
} from "@nestjs/common";
import { EventEmitter2 as EventEmitter } from "@nestjs/event-emitter";
import { JwtService } from "@nestjs/jwt";

import { PrismaService } from "../../../prisma/services/prisma.service";

import { SignInData } from "../inputs/sign-in.input";
import { Session } from "../outputs/session.output";

@Controller("auth")
export class SignInController {
  constructor(
    private readonly eventEmitter: EventEmitter,
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  @Post("sign-in")
  @HttpCode(HttpStatus.CREATED)
  async signIn(@Body() data: SignInData): Promise<Session> {
    const user = await this.prisma.user.findFirst({
      where: { email: data.email },
      select: { id: true, email: true },
    });

    if (!user) {
      throw new InternalServerErrorException();
    }

    const accessToken = this.jwt.sign({
      userId: user.id,
    });

    this.eventEmitter.emit("user.signed-in", { user });

    return new Session({ accessToken });
  }
}
