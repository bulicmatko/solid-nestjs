import { UseGuards } from "@nestjs/common";
import { EventEmitter2 as EventEmitter } from "@nestjs/event-emitter";
import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { PubSubService } from "../../../redis/services/pub-sub.service";
import { JwtAuthGuard } from "../../../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../../../auth/decorators/current-user.decorator";
import { AbilityGuard } from "../../../auth/guards/ability.guard";
import { CheckAbility } from "../../../auth/decorators/check-ability.decorator";

import { CompanyUpdateOneService } from "../../services/company-update-one.service";
import { CompanyUpdateOnePipe } from "../../pipes/company-update-one.pipe";

import { CompanyUpdateOneArgs } from "../inputs/company-update-one.input";
import { CompanyUpdateOneResult } from "../outputs/company-update-one.output";
import { Company } from "../outputs/company.output";

@Resolver()
@UseGuards(JwtAuthGuard, AbilityGuard)
export class CompanyUpdateOneResolver {
  constructor(
    private readonly eventEmitter: EventEmitter,
    private readonly pubSub: PubSubService,
    private readonly company: CompanyUpdateOneService,
  ) {}

  @Mutation(() => CompanyUpdateOneResult)
  @CheckAbility((ability) => ability.can("update", "Company"))
  async companyUpdateOne(
    @CurrentUser() user: CurrentUser,
    @Args({ type: () => CompanyUpdateOneArgs }, CompanyUpdateOnePipe)
    { id, data }: CompanyUpdateOneArgs,
  ): Promise<typeof CompanyUpdateOneResult> {
    const company = await this.company.updateOne(id, data, { user });
    this.eventEmitter.emit("company.updated", { company, user });
    this.pubSub.publish("company.updated", company);
    return new Company(company);
  }
}
