import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { AbilityBuilder, AbilityClass, InferSubjects } from "@casl/ability";
import { PrismaAbility, PrismaQuery, accessibleBy } from "@casl/prisma";

import { LoggerService } from "../../logger/services/logger.service";

import { CurrentUser } from "../decorators/current-user.decorator";

interface Sub {
  readonly userId: {
    readonly in: string[];
  };
}

interface Own {
  readonly userId: string;
}

type Condition = Own | Sub | undefined;

type Action =
  | "manage" // wildcard
  | "create"
  | "read"
  | "update"
  | "delete";

type Subject =
  | "all" // wildcard
  | InferSubjects<Prisma.ModelName>;

export type UserAbility = PrismaAbility<[Action, Subject], PrismaQuery>;

@Injectable()
export class AbilityService {
  constructor(private readonly logger: LoggerService) {
    this.logger.setContext(AbilityService.name);
  }

  getWhereInput(user: CurrentUser) {
    const ability = this.getAbility(user);
    return accessibleBy(ability);
  }

  getAbility(user: CurrentUser): UserAbility {
    this.logger.debug("Building Ability:", { user });

    const { can, build } = new AbilityBuilder(
      PrismaAbility as AbilityClass<UserAbility>,
    );

    if (user.isAdmin) {
      can("manage", "all");
    } else {
      // TODO: Improve types and check and filter out unknown values.
      user.permissions
        .map((permission) => permission.split(":"))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((permission) => permission as any)
        .forEach(([subject, action, meta]) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          can(action, subject, this.getCondition(user, meta) as any);
        });
    }

    return build();
  }

  // Every resource that can be owned by user should have `userId` key in database.
  // If that is not the case, and `own` or `sub` meta is set to permission, prisma query will fail.
  private getCondition(user: CurrentUser, meta?: string): Condition {
    switch (meta) {
      case "sub": {
        return { userId: { in: [...user.subUserIds, user.id] } };
      }

      case "own": {
        return { userId: user.id };
      }

      default: {
        return { userId: { in: [...user.subUserIds, user.id] } };
      }
    }
  }
}
