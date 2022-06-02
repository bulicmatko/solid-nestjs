import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthConfigService extends ConfigService {
  getJwtSecret(): string {
    return this.get<string>("JWT_SECRET", "supersecret");
  }
}
