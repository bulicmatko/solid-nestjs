import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";

import { RedisClientType, createClient } from "@node-redis/client";

import { RedisConfigService } from "../config/redis-config.service";

@Injectable()
export class RedisService implements OnModuleDestroy, OnModuleInit {
  readonly client: RedisClientType;

  constructor(private readonly config: RedisConfigService) {
    this.client = createClient({
      url: `redis://${config.getRedisHost()}:${config.getRedisPort()}`,
    });
  }

  async onModuleInit(): Promise<void> {
    await this.client.connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.client.quit();
  }
}
