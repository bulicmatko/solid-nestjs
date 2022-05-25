import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { EventEmitter2 as EventEmitter } from "@nestjs/event-emitter";

import { PrismaService } from "../../../../core/modules/prisma/services/prisma.service";

import { EmailService } from "../../services/email.service";
import { PasswordService } from "../../services/password.service";
import { PermissionService } from "../../services/permission.service";

import { SignUpData } from "../inputs/sign-up.input";

@Controller("auth")
export class SignUpController {
  constructor(
    private readonly eventEmitter: EventEmitter,
    private readonly prisma: PrismaService,
    private readonly email: EmailService,
    private readonly password: PasswordService,
    private readonly permission: PermissionService,
  ) {}

  @Post("sign-up")
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() data: SignUpData): Promise<void> {
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: await this.password.hash(data.password),
        profile: {
          create: {
            firstName: data.firstName,
            lastName: data.lastName,
          },
        },
        permissions: {
          createMany: {
            data: this.permission.getDefault().map((key) => ({ key })),
          },
        },
        emailConfirmationRequest: {
          create: {
            expiresAt: this.email.getConfirmationCodeExpirationDate(),
            code: this.email.getConfirmationCode(),
          },
        },
      },
      select: { id: true },
    });

    this.eventEmitter.emit("user.signed-up", { user });
  }
}
