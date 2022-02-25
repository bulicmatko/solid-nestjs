import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { ENV_FILE_PATH } from "../../../constants/env-config.constants";
import { validate } from "../../../utils/config-validator.util";

import { MailerConfig } from "./mailer-config.contracts";
import { MailerConfigService } from "./mailer-config.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validate(MailerConfig),
      envFilePath: ENV_FILE_PATH,
    }),
  ],
  providers: [MailerConfigService],
  exports: [MailerConfigService],
})
export class MailerConfigModule {}
