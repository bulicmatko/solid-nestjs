import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

import { LoggerService } from "../../logger/services/logger.service";
import { PrismaService } from "../../prisma/services/prisma.service";

import { AuthConfigService } from "../config/auth-config.service";
import { CurrentUser } from "../decorators/current-user.decorator";

interface JwtPayload {
  readonly userId: string;
}

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(JwtStrategy) {
  constructor(
    private readonly config: AuthConfigService,
    private readonly logger: LoggerService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.getJwtSecret(),
    });

    this.logger.setContext(JwtAuthStrategy.name);
  }

  async validate(payload: JwtPayload): Promise<CurrentUser> {
    this.logger.debug("Validating JWT Payload:", { payload });

    if (!payload.userId) {
      throw new UnauthorizedException();
    }

    const now = new Date();

    const user = await this.prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        userId: true,
        // TODO: Set how many levels deep we want to go.
        // Tree structure (recursive query) not yet supported.
        // https://github.com/prisma/prisma/issues/4562
        subUsers: { select: { id: true } },
        permissions: {
          where: {
            OR: [
              { activeFrom: null, activeTo: null },
              { activeFrom: null, activeTo: { gte: now } },
              { activeFrom: { lte: now }, activeTo: null },
              { activeFrom: { lte: now }, activeTo: { gte: now } },
            ],
          },
          select: { key: true },
        },
      },
    });

    if (!user) {
      throw new InternalServerErrorException("User does not exist!");
    }

    return {
      id: user.id,
      isAdmin: !user.userId,
      subUserIds: user.subUsers.map(({ id }) => id),
      permissions: user.permissions.map(({ key }) => key),
    };
  }
}
