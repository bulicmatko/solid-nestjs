import { Injectable } from "@nestjs/common";

import { PrismaService } from "../../../core/modules/prisma/services/prisma.service";

interface CompanyCreateOneData {
  readonly userId: string;
  readonly name: string;
}

interface CreatedCompany {
  readonly id: string;
  readonly name: string;
}

@Injectable()
export class CompanyCreateOneService {
  constructor(private readonly prisma: PrismaService) {}

  createOne(data: CompanyCreateOneData): Promise<CreatedCompany> {
    return this.prisma.company.create({
      data,
      select: { id: true, name: true },
    });
  }
}
