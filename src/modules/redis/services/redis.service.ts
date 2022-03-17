import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { RedisClientType, createClient } from "@node-redis/client";

import { RedisConfigService } from "../config/redis-config.service";

@Injectable()
export class RedisService implements OnModuleDestroy, OnModuleInit {
  private readonly client: RedisClientType;

  constructor(private readonly config: RedisConfigService) {
    this.client = createClient({
      url: config.getUrl(),
    });
  }

  async onModuleInit(): Promise<void> {
    await this.client.connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.client.quit();
  }

  async set<T>(key: string, value: T, expiresIn = -1): Promise<[string, T]> {
    await this.client.set(key, JSON.stringify(value), { EX: expiresIn });
    return [key, value];
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }
}
