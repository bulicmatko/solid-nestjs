import { ResolveField, Resolver, Root } from "@nestjs/graphql";

import { PrismaService } from "../../prisma/services/prisma.service";

import { Company, CompanyOwner } from "./company.output";

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly prisma: PrismaService) {}

  @ResolveField(() => CompanyOwner, { nullable: true })
  owner(@Root() { id }: Company): Promise<CompanyOwner | null> {
    return this.prisma.company
      .findUnique({ where: { id } })
      .user({ select: { id: true, email: true } });
  }
}
