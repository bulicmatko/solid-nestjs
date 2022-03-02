import { IsDefined, IsEmail, IsString, MaxLength } from "class-validator";

import { IsExistingEmail } from "../decorators/is-existing-email.decorator";

export class RequestPasswordResetData {
  @IsExistingEmail()
  @MaxLength(320)
  @IsEmail()
  @IsString()
  @IsDefined()
  readonly email: string;
}
