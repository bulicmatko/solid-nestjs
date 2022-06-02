import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { ENV_FILE_PATH } from "../../constants/env-config.constants";
import { validate } from "../../utils/config-validator.util";

import { AuthConfig } from "./auth-config.contracts";
import { AuthConfigService } from "./auth-config.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validate(AuthConfig),
      envFilePath: ENV_FILE_PATH,
    }),
  ],
  providers: [AuthConfigService],
  exports: [AuthConfigService],
})
export class AuthConfigModule {}
