import { Module } from "@nestjs/common";

import { PrismaModule } from "../prisma/prisma.module";
import { AuthModule } from "../auth/auth.module";

import { CompanyResolver } from "./user-interface/company.resolver";
import { CompanyIdValidator } from "./validators/company-id.validator";
import { CompanyNameValidator } from "./validators/company-name.validator";
import { CompanyIsVisibleService } from "./services/company-is-visible.service";

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [
    CompanyResolver,
    CompanyIdValidator,
    CompanyNameValidator,
    CompanyIsVisibleService,
  ],
  exports: [CompanyIdValidator, CompanyNameValidator, CompanyIsVisibleService],
})
export class CompanyModule {}
