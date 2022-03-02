import { IsDefined, IsString, IsUUID } from "class-validator";

import { IsExistingEmailConfirmationCode } from "../decorators/is-existing-email-confirmation-code.decorator";
import { IsActiveEmailConfirmationCode } from "../decorators/is-active-email-confirmation-code.decorator";

export class ConfirmEmailData {
  @IsActiveEmailConfirmationCode()
  @IsExistingEmailConfirmationCode()
  @IsUUID()
  @IsString()
  @IsDefined()
  readonly code: string;
}
