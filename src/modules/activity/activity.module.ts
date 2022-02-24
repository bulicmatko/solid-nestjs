import { Module } from "@nestjs/common";

import { LoggerModule } from "../logger/logger.module";
import { PrismaModule } from "../prisma/prisma.module";

import { ActivityCreateOneService } from "./services/activity-create-one.service";

import { UserSignedUpListener } from "./listeners/user-signed-up.listener";
import { CompanyCreatedListener } from "./listeners/company-created.listener";

@Module({
  imports: [LoggerModule, PrismaModule],
  providers: [
    ActivityCreateOneService,

    UserSignedUpListener,
    CompanyCreatedListener,
  ],
})
export class ActivityModule {}
