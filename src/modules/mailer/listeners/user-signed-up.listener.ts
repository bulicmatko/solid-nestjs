import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";

import { MailerService } from "../services/mailer.service";

interface UserSignUpEvent {
  readonly user: {
    readonly id: number;
    readonly email: string;
  };
}

@Injectable()
export class UserSignedUpListener {
  constructor(private readonly mailer: MailerService) {}

  @OnEvent("user.signed-up")
  sendWelcomeEmail({ user }: UserSignUpEvent): void {
    // TODO: Add event data validation.

    this.mailer.sendEmail({
      from: "no-reply@example.com",
      to: user.email,
      subject: "Welcome!",
      html: `Welcome, <strong>${user.email}!</strong>`,
    });
  }
}
