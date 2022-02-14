import { Injectable } from '@nestjs/common';

import { LoggerService } from '../../logger/services/logger.service';
import { PrismaService } from '../../prisma/services/prisma.service';

interface UserCreateOneData {
  readonly email: string;
}

interface CreatedUser {
  readonly id: number;
  readonly email: string;
}

@Injectable()
export class UserCreateOneService {
  constructor(
    private readonly logger: LoggerService,
    private readonly prisma: PrismaService,
  ) {
    this.logger.setContext(UserCreateOneService.name);
  }

  async createOne(data: UserCreateOneData): Promise<CreatedUser> {
    this.logger.debug('Creating User:', { data });

    const user = await this.prisma.user.create({
      data,
      select: { id: true, email: true },
    });

    this.logger.debug('User Created:', { user });

    return user;
  }
}
