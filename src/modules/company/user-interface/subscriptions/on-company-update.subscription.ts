import { Resolver, Subscription } from "@nestjs/graphql";

import { PubSubService } from "../../../pub-sub/services/pub-sub.service";

import { Company } from "../outputs/company.output";

@Resolver()
// TODO: Add Guards
export class OnCompanyUpdateSubscription {
  constructor(private readonly pubSub: PubSubService) {}

  @Subscription(() => Company, {
    resolve: (company: Company) => new Company(company),
  })
  onCompanyUpdate(): AsyncIterator<Company> {
    return this.pubSub.asyncIterator<Company>("company.updated");
  }
}
