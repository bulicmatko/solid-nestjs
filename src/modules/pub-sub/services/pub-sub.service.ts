import { Injectable } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { PubSubConfigService } from '../config/pub-sub-config.service';

@Injectable()
export class PubSubService extends RedisPubSub {
  constructor(private readonly config: PubSubConfigService) {
    super({
      connection: {
        host: config.getRedisHost(),
        port: config.getRedisPort(),
      },
    });
  }
}
