import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { ENV_FILE_PATH } from "../../../constants/env-config.constants";
import { validate } from "../../../utils/config-validator.util";

import { LoggerConfig } from "./logger-config.contracts";
import { LoggerConfigService } from "./logger-config.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validate(LoggerConfig),
      envFilePath: ENV_FILE_PATH,
    }),
  ],
  providers: [LoggerConfigService],
  exports: [LoggerConfigService],
})
export class LoggerConfigModule {}
