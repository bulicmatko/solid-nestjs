import { CustomDecorator, SetMetadata } from "@nestjs/common";

import {
  AbilityChecker,
  METADATA_ABILITY_HANDLER,
} from "../guards/ability.guard";

export function CheckAbility(checker: AbilityChecker): CustomDecorator<string> {
  return SetMetadata(METADATA_ABILITY_HANDLER, checker);
}
