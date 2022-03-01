import { Injectable } from "@nestjs/common";

import { LoggerService } from "../../logger/services/logger.service";
import { PrismaService } from "../../prisma/services/prisma.service";

interface UserSignUpData {
  readonly email: string;
}

@Injectable()
export class UserSignUpService {
  constructor(
    private readonly logger: LoggerService,
    private readonly prisma: PrismaService,
  ) {
    this.logger.setContext(UserSignUpService.name);
  }

  async userSignUp(data: UserSignUpData): Promise<void> {
    this.logger.debug("Signing User Up:", { data });

    const user = await this.prisma.user.create({
      data: { email: data.email },
      select: { id: true, email: true },
    });

    this.logger.debug("User Signed Up:", { user });
  }
}
