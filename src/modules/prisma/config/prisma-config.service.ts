import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { DatabaseLogLevel } from "./prisma-config.contracts";

@Injectable()
export class PrismaConfigService extends ConfigService {
  getDatabaseUrl(): string {
    return this.get<string>(
      "DATABASE_URL",
      "postgresql://user:password@localhost:5432/database",
    );
  }

  getDatabaseLogLevels(): DatabaseLogLevel[] {
    return this.get<DatabaseLogLevel[]>("DATABASE_LOG_LEVELS", [
      DatabaseLogLevel.ERROR,
      DatabaseLogLevel.WARN,
      DatabaseLogLevel.INFO,
      DatabaseLogLevel.QUERY,
    ]);
  }
}
