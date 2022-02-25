import { Module } from "@nestjs/common";

import { LoggerModule } from "../logger/logger.module";

import { MailerConfigModule } from "./config/mailer-config.module";
import { MailerService } from "./services/mailer.service";

@Module({
  imports: [MailerConfigModule, LoggerModule],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
