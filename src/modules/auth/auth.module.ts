import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { LoggerModule } from "../logger/logger.module";
import { PrismaModule } from "../prisma/prisma.module";
import { RedisModule } from "../redis/redis.module";

import { AuthConfigModule } from "./config/auth-config.module";

import { UserSignUpController } from "./user-interface/controllers/user-sign-up.controller";
import { UserSignInController } from "./user-interface/controllers/user-sign-in.controller";

import { JwtAuthStrategy } from "./strategies/jwt-auth.strategy";

import { IsUniqueUserEmailConstraint } from "./constraints/is-unique-user-email.constraint";
import { IsExistingUserEmailConstraint } from "./constraints/is-existing-user-email.constraint";

import { AuthConfigService } from "./config/auth-config.service";
import { UserSignUpService } from "./services/user-sign-up.service";
import { UserSignInService } from "./services/user-sign-in.service";
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
  controllers: [UserSignUpController, UserSignInController],
  providers: [
    JwtAuthStrategy,

    IsUniqueUserEmailConstraint,
    IsExistingUserEmailConstraint,

    UserSignUpService,
    UserSignInService,
    AbilityService,
  ],
  exports: [AbilityService],
})
export class AuthModule {}
