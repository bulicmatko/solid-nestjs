import { Module } from "@nestjs/common";
import { JwtModule as NestJwtModule } from "@nestjs/jwt";

import { LoggerModule } from "../logger/logger.module";
import { PrismaModule } from "../prisma/prisma.module";

import { AuthConfigModule } from "./config/auth-config.module";
import { AuthConfigService } from "./config/auth-config.service";
import { JwtAuthStrategy } from "./strategies/jwt-auth.strategy";
import { AbilityService } from "./services/ability.service";

@Module({
  imports: [
    LoggerModule,
    PrismaModule,
    AuthConfigModule,
    NestJwtModule.registerAsync({
      imports: [AuthConfigModule],
      inject: [AuthConfigService],
      useFactory: (config: AuthConfigService) => ({
        secret: config.getJwtSecret(),
      }),
    }),
  ],
  providers: [JwtAuthStrategy, AbilityService],
  exports: [AbilityService],
})
export class AuthModule {}
