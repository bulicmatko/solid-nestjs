import { ResolveField, Resolver, Root } from "@nestjs/graphql";

import { CompanyFindOwnerService } from "../../services/company-find-owner.service";

import { Company } from "../outputs/company.output";
import { CompanyOwner } from "../outputs/company-owner.output";

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly company: CompanyFindOwnerService) {}

  @ResolveField(() => CompanyOwner, { nullable: true })
  owner(@Root() { id }: Company): Promise<CompanyOwner | null> {
    return this.company.findOwner(id);
  }
}
