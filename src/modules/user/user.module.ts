import { Module } from "@nestjs/common";

import { LoggerModule } from "../logger/logger.module";
import { PrismaModule } from "../prisma/prisma.module";

import { UserSignUpController } from "./user-interface/controllers/user-sign-up.controller";

import { UserCreateOneService } from "./services/user-create-one.service";

import { IsUniqueUserEmailConstraint } from "./constraints/is-unique-user-email.constraint";

@Module({
  imports: [LoggerModule, PrismaModule],
  controllers: [UserSignUpController],
  providers: [UserCreateOneService, IsUniqueUserEmailConstraint],
})
export class UserModule {}
