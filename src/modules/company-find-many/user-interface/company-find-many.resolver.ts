import { UseGuards } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";

import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../../auth/decorators/current-user.decorator";

import { CompanyFindManyValidator } from "../validators/company-find-many.validator";
import { CompanyFindManyService } from "../services/company-find-many.service";

import { CompanyFindManyArgs } from "./company-find-many.input";
import {
  CompanyConnection,
  CompanyFindManyResult,
} from "./company-find-many.output";

@Resolver()
export class CompanyFindManyResolver {
  constructor(
    private readonly validator: CompanyFindManyValidator,
    private readonly service: CompanyFindManyService,
  ) {}

  @Query(() => CompanyFindManyResult)
  @UseGuards(JwtAuthGuard)
  async companyFindMany(
    @CurrentUser() user: CurrentUser,
    @Args({ type: () => CompanyFindManyArgs })
    args: CompanyFindManyArgs,
  ): Promise<typeof CompanyFindManyResult> {
    const { filter = {} } = await this.validator.validate(args, { user });
    const companyConnection = await this.service.findMany(filter, { user });
    return new CompanyConnection(companyConnection);
  }
}
