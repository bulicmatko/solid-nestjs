import { Module } from "@nestjs/common";

import { LoggerModule } from "../logger/logger.module";
import { PrismaModule } from "../prisma/prisma.module";

import { UserSignUpController } from "./user-interface/controllers/user-sign-up.controller";

import { UserCreateOneService } from "./services/user-create-one.service";

@Module({
  imports: [LoggerModule, PrismaModule],
  controllers: [UserSignUpController],
  providers: [UserCreateOneService],
})
export class UserModule {}
