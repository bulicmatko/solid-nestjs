import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

import { IsExistingUserEmail } from "../decorators/is-existing-email.decorator";

export class UserSignInData {
  @IsExistingUserEmail()
  @MaxLength(320)
  @IsEmail()
  @IsString()
  @IsDefined()
  readonly email: string;

  @IsBoolean()
  @IsOptional()
  readonly remember?: boolean;
}
