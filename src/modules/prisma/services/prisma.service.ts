import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

import { PrismaConfigService } from "../config/prisma-config.service";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly config: PrismaConfigService) {
    super({
      log: config
        .getDatabaseLogLevels()
        .map((level) => ({ emit: "stdout", level })),
      errorFormat: "pretty",
    });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
