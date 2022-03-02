import {
  IsDefined,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from "class-validator";

import { IsExistingPasswordResetCode } from "../decorators/is-existing-password-reset-code.decorator";
import { IsNotExpiredPasswordResetCode } from "../decorators/is-not-expired-password-reset-code.decorator";

export class ResetPasswordData {
  @IsNotExpiredPasswordResetCode()
  @IsExistingPasswordResetCode()
  @IsUUID()
  @IsString()
  @IsDefined()
  readonly code: string;

  @MaxLength(72)
  @MinLength(8)
  @IsString()
  @IsDefined()
  readonly password: string;
}
