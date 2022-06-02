import { UseGuards } from "@nestjs/common";
import { EventEmitter2 as EventEmitter } from "@nestjs/event-emitter";
import { Args, Mutation, Resolver, Subscription } from "@nestjs/graphql";

import { PubSubService } from "../../../core/redis/services/pub-sub.service";

import { JwtAuthGuard } from "../../../core/auth/guards/jwt-auth.guard";
import { CurrentUser } from "../../../core/auth/decorators/current-user.decorator";

import { Company } from "../../company/user-interface/company.output";

import { CompanyIsVisibleService } from "../../company/services/company-is-visible.service";

import { CompanyCreateOneValidator } from "../validators/company-create-one.validator";
import { CompanyCreateOneService } from "../services/company-create-one.service";

import { CompanyCreateOneArgs } from "./company-create-one.input";
import { CompanyCreateOneResult } from "./company-create-one.output";

interface SubscriptionFilterMeta {
  readonly user: CurrentUser;
}

@Resolver()
export class CompanyCreateOneResolver {
  constructor(
    private readonly eventEmitter: EventEmitter,
    private readonly pubSub: PubSubService,
    private readonly company: CompanyIsVisibleService,
    private readonly validator: CompanyCreateOneValidator,
    private readonly service: CompanyCreateOneService,
  ) {}

  @Mutation(() => CompanyCreateOneResult)
  @UseGuards(JwtAuthGuard)
  async companyCreateOne(
    @CurrentUser() user: CurrentUser,
    @Args({ type: () => CompanyCreateOneArgs })
    args: CompanyCreateOneArgs,
  ): Promise<typeof CompanyCreateOneResult> {
    const { data } = await this.validator.validate(args, { user });
    const company = await this.service.createOne({ ...data, userId: user.id });

    this.eventEmitter.emit("company.created", { company, user });
    this.pubSub.publish("company.created", company);

    return new Company(company);
  }

  @Subscription(() => Company, {
    filter(
      this: CompanyCreateOneResolver,
      company: Company,
      args: unknown,
      { user }: SubscriptionFilterMeta,
    ) {
      return this.company.isVisible(company.id, { user });
    },
    resolve(company: Company) {
      return new Company(company);
    },
  })
  onCompanyCreateOne(): AsyncIterator<Company> {
    return this.pubSub.asyncIterator<Company>("company.created");
  }
}
