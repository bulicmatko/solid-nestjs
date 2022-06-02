import { Injectable } from "@nestjs/common";

import { PrismaService } from "../../modules/prisma/services/prisma.service";

import { LoggerService } from "../../logger/services/logger.service";

interface ActivityCreateOneData {
  readonly action: string;
  readonly subject?: string;
  readonly meta?: object;
}

interface ActivityCreateOneMeta {
  readonly user: {
    readonly id: string;
  };
}

@Injectable()
export class ActivityCreateOneService {
  constructor(
    private readonly logger: LoggerService,
    private readonly prisma: PrismaService,
  ) {
    this.logger.setContext(ActivityCreateOneService.name);
  }

  async createOne(
    data: ActivityCreateOneData,
    { user }: ActivityCreateOneMeta,
  ): Promise<void> {
    this.logger.debug("Creating Activity:", { data, user });

    const activity = await this.prisma.activity.create({
      data: { ...data, userId: user.id },
      select: { id: true, action: true, subject: true },
    });

    this.logger.debug("Activity Created:", { activity });
  }
}
