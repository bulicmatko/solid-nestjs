import { Module } from "@nestjs/common";

import { LoggerModule } from "../logger/logger.module";
import { PrismaModule } from "../prisma/prisma.module";

import { ActivityCreateOneService } from "./services/activity-create-one.service";
import { UserSignedUpEventListener } from "./listeners/user-signed-up-event.listener";
import { CompanyCreatedEventListener } from "./listeners/company-created-event.listener";

@Module({
  imports: [LoggerModule, PrismaModule],
  providers: [
    ActivityCreateOneService,
    UserSignedUpEventListener,
    CompanyCreatedEventListener,
  ],
})
export class ActivityModule {}
