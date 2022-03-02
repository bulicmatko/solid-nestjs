import { IsDefined, IsEmail, IsString, MaxLength } from "class-validator";

import { IsExistingEmail } from "../decorators/is-existing-email.decorator";
import { IsNotConfirmedEmail } from "../decorators/is-not-confirmed-email.decorator";

export class RequestEmailConfirmationData {
  @IsNotConfirmedEmail()
  @IsExistingEmail()
  @MaxLength(320)
  @IsEmail()
  @IsString()
  @IsDefined()
  readonly email: string;
}
