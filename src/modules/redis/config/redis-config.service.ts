import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RedisConfigService extends ConfigService {
  getHost(): string {
    return this.get<string>("REDIS_HOST", "localhost");
  }

  getPort(): number {
    return this.get<number>("REDIS_PORT", 6379);
  }

  getUrl(): string {
    return `redis://${this.getHost()}:${this.getPort()}`;
  }
}
