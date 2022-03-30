import { UseGuards } from "@nestjs/common";
import { EventEmitter2 as EventEmitter } from "@nestjs/event-emitter";
import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { PubSubService } from "../../../redis/services/pub-sub.service";
import { JwtAuthGuard } from "../../../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../../../auth/decorators/current-user.decorator";
import { AbilityGuard } from "../../../auth/guards/ability.guard";
import { CheckAbility } from "../../../auth/decorators/check-ability.decorator";

import { CompanyDeleteOneService } from "../../services/company-delete-one.service";
import { CompanyDeleteOnePipe } from "../../pipes/company-delete-one.pipe";

import { CompanyDeleteOneArgs } from "../inputs/company-delete-one.input";
import { CompanyDeleteOneResult } from "../outputs/company-delete-one.output";
import { Company } from "../outputs/company.output";

@Resolver()
@UseGuards(JwtAuthGuard, AbilityGuard)
export class CompanyDeleteOneResolver {
  constructor(
    private readonly eventEmitter: EventEmitter,
    private readonly pubSub: PubSubService,
    private readonly company: CompanyDeleteOneService,
  ) {}

  @Mutation(() => CompanyDeleteOneResult)
  @CheckAbility((ability) => ability.can("delete", "Company"))
  async companyDeleteOne(
    @CurrentUser() user: CurrentUser,
    @Args(CompanyDeleteOnePipe)
    { id }: CompanyDeleteOneArgs,
  ): Promise<typeof CompanyDeleteOneResult> {
    const company = await this.company.deleteOne(id, { user });
    this.eventEmitter.emit("company.deleted", { company, user });
    this.pubSub.publish("company.deleted", company);
    return new Company(company);
  }
}
