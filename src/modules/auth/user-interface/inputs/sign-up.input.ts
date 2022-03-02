import { IsDefined, IsEmail, IsString, MaxLength } from "class-validator";

import { IsUniqueEmail } from "../decorators/is-unique-email.decorator";

export class SignUpData {
  @IsUniqueEmail()
  @MaxLength(320)
  @IsEmail()
  @IsString()
  @IsDefined()
  readonly email: string;
}
