import { Injectable } from "@nestjs/common";
import { Transporter, createTransport } from "nodemailer";

import { LoggerService } from "../../logger/services/logger.service";

import { MailerConfigService } from "../config/mailer-config.service";

interface Email {
  readonly from: string;
  readonly to: string;
  readonly subject: string;
  readonly html: string;
}

@Injectable()
export class MailerService {
  private transporter: Transporter;

  constructor(
    private readonly config: MailerConfigService,
    private readonly logger: LoggerService,
  ) {
    this.transporter = createTransport({
      host: this.config.getSmtpHost(),
      port: this.config.getSmtpPort(),
      secure: this.config.getSmtpPort() === 465,
      auth: {
        user: this.config.getSmtpUser(),
        pass: this.config.getSmtpPass(),
      },
    });
  }

  sendEmail({ from, to, subject, html }: Email): void {
    this.transporter.sendMail({ from, to, subject, html }, (error) =>
      this.logger.error(error),
    );
  }
}
