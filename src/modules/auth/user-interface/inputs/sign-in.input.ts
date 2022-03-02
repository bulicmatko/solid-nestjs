import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

import { IsExistingEmail } from "../decorators/is-existing-email.decorator";

export class SignInData {
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
