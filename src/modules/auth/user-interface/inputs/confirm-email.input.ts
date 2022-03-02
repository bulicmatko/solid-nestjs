import { IsDefined, IsString, IsUUID } from "class-validator";

import { IsExistingEmailConfirmationCode } from "../decorators/is-existing-email-confirmation-code.decorator";
import { IsNotExpiredEmailConfirmationCode } from "../decorators/is-not-expired-email-confirmation-code.decorator";

export class ConfirmEmailData {
  @IsNotExpiredEmailConfirmationCode()
  @IsExistingEmailConfirmationCode()
  @IsUUID()
  @IsString()
  @IsDefined()
  readonly code: string;
}
