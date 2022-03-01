import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RedisConfigService extends ConfigService {
  getUrl(): string {
    return this.get<string>("REDIS_URL", "redis://localhost:6379");
  }
}
