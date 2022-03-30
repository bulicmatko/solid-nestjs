import { Module } from "@nestjs/common";

import { LoggerModule } from "../logger/logger.module";
import { PrismaModule } from "../prisma/prisma.module";
import { RedisModule } from "../redis/redis.module";
import { AuthModule } from "../auth/auth.module";
import { PaginationModule } from "../pagination/pagination.module";

import { OnCompanyCreateSubscription } from "./user-interface/subscriptions/on-company-create.subscription";
import { OnCompanyUpdateSubscription } from "./user-interface/subscriptions/on-company-update.subscription";
import { OnCompanyDeleteSubscription } from "./user-interface/subscriptions/on-company-delete.subscription";
import { OnCompanyRecoverSubscription } from "./user-interface/subscriptions/on-company-recover.subscription";

import { CompanyResolver } from "./user-interface/resolvers/company.resolver";
import { CompanyFindManyResolver } from "./user-interface/resolvers/company-find-many.resolver";
import { CompanyFindOneResolver } from "./user-interface/resolvers/company-find-one.resolver";
import { CompanyCreateOneResolver } from "./user-interface/resolvers/company-create-one.resolver";
import { CompanyUpdateOneResolver } from "./user-interface/resolvers/company-update-one.resolver";
import { CompanyDeleteOneResolver } from "./user-interface/resolvers/company-delete-one.resolver";
import { CompanyRecoverOneResolver } from "./user-interface/resolvers/company-recover-one.resolver";

import { CompanyNameValidator } from "./validators/company-name.validator";
import { CompanyCreateOneValidator } from "./validators/company-create-one.validator";

import { CompanyService } from "./services/company.service";
import { CompanyFindManyService } from "./services/company-find-many.service";
import { CompanyFindOneService } from "./services/company-find-one.service";
import { CompanyFindOwnerService } from "./services/company-find-owner.service";
import { CompanyCreateOneService } from "./services/company-create-one.service";
import { CompanyUpdateOneService } from "./services/company-update-one.service";
import { CompanyDeleteOneService } from "./services/company-delete-one.service";
import { CompanyRecoverOneService } from "./services/company-recover-one.service";

@Module({
  imports: [
    LoggerModule,
    PrismaModule,
    RedisModule,
    AuthModule,
    PaginationModule,
  ],
  providers: [
    OnCompanyCreateSubscription,
    OnCompanyUpdateSubscription,
    OnCompanyDeleteSubscription,
    OnCompanyRecoverSubscription,

    CompanyResolver,
    CompanyFindManyResolver,
    CompanyFindOneResolver,
    CompanyFindOwnerService,
    CompanyCreateOneResolver,
    CompanyUpdateOneResolver,
    CompanyDeleteOneResolver,
    CompanyRecoverOneResolver,

    CompanyNameValidator,
    CompanyCreateOneValidator,

    CompanyService,
    CompanyFindManyService,
    CompanyFindOneService,
    CompanyCreateOneService,
    CompanyUpdateOneService,
    CompanyDeleteOneService,
    CompanyRecoverOneService,
  ],
})
export class CompanyModule {}
