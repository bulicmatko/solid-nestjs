import { UseGuards } from "@nestjs/common";
import { EventEmitter2 as EventEmitter } from "@nestjs/event-emitter";
import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { PubSubService } from "../../../pub-sub/services/pub-sub.service";
import { JwtAuthGuard } from "../../../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../../../auth/decorators/current-user.decorator";
import { AbilityGuard } from "../../../auth/guards/ability.guard";
import { CheckAbility } from "../../../auth/decorators/check-ability.decorator";

import { CompanyCreateOneService } from "../../services/company-create-one.service";

import { CompanyCreateOneArgs } from "../inputs/company-create-one.input";
import { CompanyCreateOneResult } from "../outputs/company-create-one.output";
import { Company } from "../outputs/company.output";

@Resolver()
@UseGuards(JwtAuthGuard, AbilityGuard)
export class CompanyCreateOneResolver {
  constructor(
    private readonly eventEmitter: EventEmitter,
    private readonly pubSub: PubSubService,
    private readonly company: CompanyCreateOneService,
  ) {}

  @Mutation(() => CompanyCreateOneResult)
  @CheckAbility((ability) => ability.can("create", "Company"))
  async companyCreateOne(
    @CurrentUser() user: CurrentUser,
    @Args({ type: () => CompanyCreateOneArgs })
    { data }: CompanyCreateOneArgs,
  ): Promise<typeof CompanyCreateOneResult> {
    const company = await this.company.createOne(data, { user });
    this.eventEmitter.emit("company.created", { company, user });
    this.pubSub.publish("company.created", company);
    return new Company(company);
  }
}
