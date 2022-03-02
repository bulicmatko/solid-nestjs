import { IsDefined, IsEmail, IsString, MaxLength } from "class-validator";

import { IsExistingEmail } from "../decorators/is-existing-email.decorator";
import { IsConfirmedEmail } from "../decorators/is-confirmed-email.decorator";

export class RequestPasswordResetData {
  @IsConfirmedEmail()
  @IsExistingEmail()
  @MaxLength(320)
  @IsEmail()
  @IsString()
  @IsDefined()
  readonly email: string;
}
