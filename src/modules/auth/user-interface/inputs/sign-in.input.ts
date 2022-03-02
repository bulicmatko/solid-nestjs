import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

import { IsExistingEmail } from "../decorators/is-existing-email.decorator";
import { IsConfirmedEmail } from "../decorators/is-confirmed-email.decorator";

export class SignInData {
  @IsConfirmedEmail()
  @IsExistingEmail()
  @MaxLength(320)
  @IsEmail()
  @IsString()
  @IsDefined()
  readonly email: string;

  @IsBoolean()
  @IsOptional()
  readonly remember?: boolean;
}
