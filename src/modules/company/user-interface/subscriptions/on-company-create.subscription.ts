import { Resolver, Subscription } from "@nestjs/graphql";

import { PubSubService } from "../../../redis/services/pub-sub.service";

import { Company } from "../outputs/company.output";

@Resolver()
// TODO: Add Guards
export class OnCompanyCreateSubscription {
  constructor(private readonly pubSub: PubSubService) {}

  @Subscription(() => Company, {
    resolve: (company: Company) => new Company(company),
  })
  onCompanyCreate(): AsyncIterator<Company> {
    return this.pubSub.asyncIterator<Company>("company.created");
  }
}
