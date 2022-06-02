import { Module } from "@nestjs/common";

import { LoggerModule } from "../logger/logger.module";

import { MailerConfigModule } from "./config/mailer-config.module";
import { MailerService } from "./services/mailer.service";
import { UserSignedUpEventListener } from "./listeners/user-signed-up-event.listener";

@Module({
  imports: [MailerConfigModule, LoggerModule],
  providers: [MailerService, UserSignedUpEventListener],
  exports: [MailerService],
})
export class MailerModule {}
