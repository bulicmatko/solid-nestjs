import { Module } from "@nestjs/common";

import { RedisConfigModule } from "./config/redis-config.module";
import { RedisService } from "./services/redis.service";
import { PubSubService } from "./services/pub-sub.service";

@Module({
  imports: [RedisConfigModule],
  providers: [RedisService, PubSubService],
  exports: [RedisService, PubSubService],
})
export class RedisModule {}
