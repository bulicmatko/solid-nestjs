import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RedisConfigService extends ConfigService {
  getRedisHost(): string {
    return this.get<string>("REDIS_HOST", "localhost");
  }

  getRedisPort(): number {
    return this.get<number>("REDIS_PORT", 6379);
  }
}
