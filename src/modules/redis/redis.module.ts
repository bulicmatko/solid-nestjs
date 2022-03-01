import { Module } from "@nestjs/common";

import { RedisConfigModule } from "./config/redis-config.module";
import { RedisService } from "./services/redis.service";

@Module({
  imports: [RedisConfigModule],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
