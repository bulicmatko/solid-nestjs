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

  getUser(): string | undefined {
    return this.get<string | undefined>("REDIS_USER");
  }

  getPass(): string | undefined {
    return this.get<string | undefined>("REDIS_PASS");
  }

  getUrl(): string {
    const host = this.getHost();
    const port = this.getPort();
    const user = this.getUser();
    const pass = this.getPass();

    return `redis://${[user, pass].join(":")}@${host}:${port}`;
  }
}
