import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";

import { MailerService } from "../services/mailer.service";

interface UserSignUpEvent {
  readonly user: {
    readonly id: string;
    readonly email: string;
  };
}

@Injectable()
export class UserSignedUpEventListener {
  constructor(private readonly mailer: MailerService) {}

  @OnEvent("user.signed-up")
  handle({ user }: UserSignUpEvent): void {
    // TODO: Add event data validation.

    this.mailer.sendEmail({
      from: "no-reply@example.com",
      to: user.email,
      subject: "Welcome!",
      html: `Welcome, <strong>${user.email}!</strong>`,
    });
  }
}
