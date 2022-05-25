import { Module } from "@nestjs/common";

import { PrismaModule } from "../../core/modules/prisma/prisma.module";

import { RedisModule } from "../redis/redis.module";
import { AuthModule } from "../auth/auth.module";

import { CompanyModule } from "../company/company.module";

import { CompanyCreateOneResolver } from "./user-interface/company-create-one.resolver";
import { CompanyCreateOneValidator } from "./validators/company-create-one.validator";
import { CompanyCreateOneService } from "./services/company-create-one.service";

@Module({
  imports: [PrismaModule, RedisModule, AuthModule, CompanyModule],
  providers: [
    CompanyCreateOneResolver,
    CompanyCreateOneValidator,
    CompanyCreateOneService,
  ],
})
export class CompanyCreateOneModule {}
