import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { LoggerModule } from "../logger/logger.module";
import { PrismaModule } from "../prisma/prisma.module";
import { RedisModule } from "../redis/redis.module";

import { AuthConfigModule } from "./config/auth-config.module";
import { AuthConfigService } from "./config/auth-config.service";
import { JwtAuthStrategy } from "./strategies/jwt-auth.strategy";
import { SessionService } from "./services/session.service";
import { AbilityService } from "./services/ability.service";

@Module({
  imports: [
    LoggerModule,
    PrismaModule,
    RedisModule,
    AuthConfigModule,
    JwtModule.registerAsync({
      imports: [AuthConfigModule],
      inject: [AuthConfigService],
      useFactory: (config: AuthConfigService) => ({
        secret: config.getJwtSecret(),
      }),
    }),
  ],
  providers: [JwtAuthStrategy, SessionService, AbilityService],
  exports: [AbilityService],
})
export class AuthModule {}
