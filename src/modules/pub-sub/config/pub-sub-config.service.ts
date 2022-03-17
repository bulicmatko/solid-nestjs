import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class PubSubConfigService extends ConfigService {
  getRedisHost(): string {
    return this.get<string>("PUB_SUB_REDIS_HOST", "localhost");
  }

  getRedisPort(): number {
    return this.get<number>("PUB_SUB_REDIS_PORT", 6379);
  }

  getRedisUrl(): string {
    return `redis://${this.getRedisHost()}:${this.getRedisUrl()}`;
  }
}
