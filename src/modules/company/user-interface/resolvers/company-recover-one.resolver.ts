import { UseGuards } from "@nestjs/common";
import { EventEmitter2 as EventEmitter } from "@nestjs/event-emitter";
import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { PubSubService } from "../../../redis/services/pub-sub.service";
import { JwtAuthGuard } from "../../../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../../../auth/decorators/current-user.decorator";
import { AbilityGuard } from "../../../auth/guards/ability.guard";
import { CheckAbility } from "../../../auth/decorators/check-ability.decorator";

import { CompanyRecoverOneService } from "../../services/company-recover-one.service";

import { CompanyRecoverOneArgs } from "../inputs/company-recover-one.input";
import { CompanyRecoverOneResult } from "../outputs/company-recover-one.output";
import { Company } from "../outputs/company.output";

@Resolver()
@UseGuards(JwtAuthGuard, AbilityGuard)
export class CompanyRecoverOneResolver {
  constructor(
    private readonly eventEmitter: EventEmitter,
    private readonly pubSub: PubSubService,
    private readonly company: CompanyRecoverOneService,
  ) {}

  @Mutation(() => CompanyRecoverOneResult)
  @CheckAbility((ability) => ability.can("delete", "Company"))
  async companyRecoverOne(
    @CurrentUser() user: CurrentUser,
    @Args({ type: () => CompanyRecoverOneArgs })
    { id }: CompanyRecoverOneArgs,
  ): Promise<typeof CompanyRecoverOneResult> {
    const company = await this.company.recoverOne(id, { user });
    this.eventEmitter.emit("company.recovered", { company, user });
    this.pubSub.publish("company.recovered", company);
    return new Company(company);
  }
}
