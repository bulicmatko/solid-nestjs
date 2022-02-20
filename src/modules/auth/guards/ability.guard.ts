import { Reflector } from "@nestjs/core";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

import { getRequest } from "../../../utils/execution-context.util";

import { AbilityService, UserAbility } from "../services/ability.service";

export const METADATA_ABILITY_HANDLER = "METADATA_ABILITY_HANDLER";

export interface AbilityChecker {
  (ability: UserAbility): boolean;
}

@Injectable()
export class AbilityGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly ability: AbilityService,
  ) {}

  getRequest = getRequest;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const checkAbility = this.reflector.get<AbilityChecker | undefined>(
      METADATA_ABILITY_HANDLER,
      context.getHandler(),
    );

    if (!checkAbility) {
      return true;
    }

    const { user } = this.getRequest(context);
    const ability = await this.ability.getAbility(user);

    return checkAbility(ability);
  }
}
