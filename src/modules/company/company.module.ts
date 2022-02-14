import { Module } from '@nestjs/common';

import { LoggerModule } from '../logger/logger.module';
import { PubSubModule } from '../pub-sub/pub-sub.module';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { PaginationModule } from '../pagination/pagination.module';

import { CompanyResolver } from './user-interface/resolvers/company.resolver';
import { CompanyFindManyResolver } from './user-interface/resolvers/company-find-many.resolver';
import { CompanyFindOneResolver } from './user-interface/resolvers/company-find-one.resolver';
import { CompanyCreateOneResolver } from './user-interface/resolvers/company-create-one.resolver';
import { CompanyUpdateOneResolver } from './user-interface/resolvers/company-update-one.resolver';
import { CompanyDeleteOneResolver } from './user-interface/resolvers/company-delete-one.resolver';
import { CompanyRecoverOneResolver } from './user-interface/resolvers/company-recover-one.resolver';

import { OnCompanyCreateSubscription } from './user-interface/subscriptions/on-company-create.subscription';
import { OnCompanyUpdateSubscription } from './user-interface/subscriptions/on-company-update.subscription';
import { OnCompanyDeleteSubscription } from './user-interface/subscriptions/on-company-delete.subscription';
import { OnCompanyRecoverSubscription } from './user-interface/subscriptions/on-company-recover.subscription';

import { CompanyService } from './services/company.service';
import { CompanyFindManyService } from './services/company-find-many.service';
import { CompanyFindOneService } from './services/company-find-one.service';
import { CompanyFindOwnerService } from './services/company-find-owner.service';
import { CompanyCreateOneService } from './services/company-create-one.service';
import { CompanyUpdateOneService } from './services/company-update-one.service';
import { CompanyDeleteOneService } from './services/company-delete-one.service';
import { CompanyRecoverOneService } from './services/company-recover-one.service';

import { IsUniqueCompanyNameConstraint } from './constraints/is-unique-company-name.constraint';

@Module({
  imports: [
    LoggerModule,
    PubSubModule,
    PrismaModule,
    AuthModule,
    PaginationModule,
  ],
  providers: [
    CompanyResolver,
    CompanyFindManyResolver,
    CompanyFindOneResolver,
    CompanyFindOwnerService,
    CompanyCreateOneResolver,
    CompanyUpdateOneResolver,
    CompanyDeleteOneResolver,
    CompanyRecoverOneResolver,

    OnCompanyCreateSubscription,
    OnCompanyUpdateSubscription,
    OnCompanyDeleteSubscription,
    OnCompanyRecoverSubscription,

    CompanyService,
    CompanyFindManyService,
    CompanyFindOneService,
    CompanyCreateOneService,
    CompanyUpdateOneService,
    CompanyDeleteOneService,
    CompanyRecoverOneService,

    IsUniqueCompanyNameConstraint,
  ],
})
export class CompanyModule {}
