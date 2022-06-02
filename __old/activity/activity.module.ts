import { Module } from "@nestjs/common";

import { PrismaModule } from "../modules/prisma/prisma.module";

import { LoggerModule } from "../logger/logger.module";

import { ActivityCreateOneService } from "./services/activity-create-one.service";

import { UserSignedUpEventListener } from "./listeners/user-signed-up-event.listener";
import { UserSignedInEventListener } from "./listeners/user-signed-in-event.listener";

import { CompanyCreatedEventListener } from "./listeners/company-created-event.listener";
import { CompanyUpdatedEventListener } from "./listeners/company-updated-event.listener";

@Module({
  imports: [LoggerModule, PrismaModule],
  providers: [
    ActivityCreateOneService,

    UserSignedUpEventListener,
    UserSignedInEventListener,

    CompanyCreatedEventListener,
    CompanyUpdatedEventListener,
  ],
})
export class ActivityModule {}
