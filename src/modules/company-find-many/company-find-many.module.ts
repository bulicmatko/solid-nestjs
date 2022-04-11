import { Module } from "@nestjs/common";

import { PrismaModule } from "../prisma/prisma.module";
import { AuthModule } from "../auth/auth.module";
import { PaginationModule } from "../pagination/pagination.module";
import { CompanyModule } from "../company/company.module";

import { CompanyFindManyResolver } from "./user-interface/company-find-many.resolver";
import { CompanyFindManyValidator } from "./validators/company-find-many.validator";
import { CompanyFindManyService } from "./services/company-find-many.service";

@Module({
  imports: [PrismaModule, AuthModule, PaginationModule, CompanyModule],
  providers: [
    CompanyFindManyResolver,
    CompanyFindManyValidator,
    CompanyFindManyService,
  ],
})
export class CompanyFindManyModule {}
