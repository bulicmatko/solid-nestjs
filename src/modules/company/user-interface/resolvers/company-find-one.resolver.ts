import { UseGuards } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";

import { JwtAuthGuard } from "../../../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../../../auth/decorators/current-user.decorator";
import { AbilityGuard } from "../../../auth/guards/ability.guard";
import { CheckAbility } from "../../../auth/decorators/check-ability.decorator";

import { CompanyFindOneService } from "../../services/company-find-one.service";
import { CompanyFindOnePipe } from "../../pipes/company-find-one.pipe";

import { CompanyFindOneArgs } from "../inputs/company-find-one.input";
import { CompanyFindOneResult } from "../outputs/company-find-one.output";
import { Company } from "../outputs/company.output";

@Resolver()
@UseGuards(JwtAuthGuard, AbilityGuard)
export class CompanyFindOneResolver {
  constructor(private readonly company: CompanyFindOneService) {}

  @Query(() => CompanyFindOneResult)
  @CheckAbility((ability) => ability.can("read", "Company"))
  async companyFindOne(
    @CurrentUser() user: CurrentUser,
    @Args({ type: () => CompanyFindOneArgs }, CompanyFindOnePipe)
    { id }: CompanyFindOneArgs,
  ): Promise<typeof CompanyFindOneResult> {
    const company = await this.company.findOne(id, { user });
    return new Company(company);
  }
}
