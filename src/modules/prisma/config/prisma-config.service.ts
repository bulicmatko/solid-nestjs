import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { LogLevel } from "./prisma-config.contracts";

@Injectable()
export class PrismaConfigService extends ConfigService {
  getDatabaseUrl(): string {
    return this.get<string>(
      "DATABASE_URL",
      "postgresql://user:password@localhost:5432/database",
    );
  }

  getLogLevels(): LogLevel[] {
    return this.get<LogLevel[]>("PRISMA_LOG_LEVELS", [
      LogLevel.ERROR,
      LogLevel.WARN,
      LogLevel.INFO,
      LogLevel.QUERY,
    ]);
  }
}
