import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { ENV_FILE_PATH } from "../../constants/env-config.constants";
import { validate } from "../../utils/config-validator.util";

import { RedisConfig } from "./redis-config.contract";
import { RedisConfigService } from "./redis-config.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validate(RedisConfig),
      envFilePath: ENV_FILE_PATH,
    }),
  ],
  providers: [RedisConfigService],
  exports: [RedisConfigService],
})
export class RedisConfigModule {}
