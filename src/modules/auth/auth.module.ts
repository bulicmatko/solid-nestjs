import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { LoggerModule } from "../logger/logger.module";
import { PrismaModule } from "../prisma/prisma.module";
import { RedisModule } from "../redis/redis.module";

import { AuthConfigModule } from "./config/auth-config.module";

import { IsUniqueEmailConstraint } from "./user-interface/decorators/is-unique-email.decorator";
import { IsExistingEmailConstraint } from "./user-interface/decorators/is-existing-email.decorator";
import { SignUpController } from "./user-interface/controllers/sign-up.controller";
import { SignInController } from "./user-interface/controllers/sign-in.controller";

import { JwtAuthStrategy } from "./strategies/jwt-auth.strategy";

import { AuthConfigService } from "./config/auth-config.service";
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
  controllers: [SignUpController, SignInController],
  providers: [
    JwtAuthStrategy,

    IsUniqueEmailConstraint,
    IsExistingEmailConstraint,

    AbilityService,
  ],
  exports: [AbilityService],
})
export class AuthModule {}
