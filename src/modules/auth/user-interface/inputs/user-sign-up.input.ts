import { IsDefined, IsEmail, IsString, MaxLength } from "class-validator";

import { IsUniqueUserEmail } from "../decorators/is-unique-email.decorator";

export class UserSignUpData {
  @IsUniqueUserEmail()
  @MaxLength(320)
  @IsEmail()
  @IsString()
  @IsDefined()
  readonly email: string;
}
