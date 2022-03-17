import { Injectable } from "@nestjs/common";
import { RedisPubSub } from "graphql-redis-subscriptions";

import { RedisConfigService } from "../config/redis-config.service";

@Injectable()
export class PubSubService extends RedisPubSub {
  constructor(private readonly config: RedisConfigService) {
    super({
      connection: {
        host: config.getHost(),
        port: config.getPort(),
      },
    });
  }
}
