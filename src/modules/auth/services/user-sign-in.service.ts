import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { LoggerService } from "../../logger/services/logger.service";
import { PrismaService } from "../../prisma/services/prisma.service";

import { AuthConfigService } from "../config/auth-config.service";

interface UserSignInData {
  readonly email: string;
  readonly remember?: boolean;
}

interface Session {
  readonly user: {
    readonly id: number;
    readonly email: string;
  };
  readonly accessToken: string;
}

@Injectable()
export class UserSignInService {
  constructor(
    private readonly config: AuthConfigService,
    private readonly logger: LoggerService,
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {
    this.logger.setContext(UserSignInService.name);
  }

  async userSignIn(data: UserSignInData): Promise<Session> {
    this.logger.debug("Signing User In:", { data });

    const user = await this.prisma.user.findFirst({
      where: { email: data.email },
      select: { id: true, email: true },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const accessToken = this.jwt.sign(
      { userId: user.id },
      { expiresIn: data.remember ? "30d" : "1d" },
    );

    this.logger.debug("User Signed In:", { user, accessToken });

    return { user, accessToken };
  }
}
