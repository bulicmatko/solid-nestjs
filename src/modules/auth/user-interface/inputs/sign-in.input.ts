import { IsDefined, IsEmail, IsString, MaxLength } from "class-validator";

import { BadRequestCode } from "../../../../user-interface/outputs/bad-request.output";

import { IsExistingEmail } from "../decorators/is-existing-email.decorator";
import { IsConfirmedEmail } from "../decorators/is-confirmed-email.decorator";

export class SignInData {
  @IsConfirmedEmail({ message: BadRequestCode.NOT_CONFIRMED })
  @IsExistingEmail({ message: BadRequestCode.NOT_FOUND })
  @MaxLength(320, { message: BadRequestCode.TOO_LONG })
  @IsEmail({ message: BadRequestCode.INVALID })
  @IsString({ message: BadRequestCode.INVALID })
  @IsDefined({ message: BadRequestCode.REQUIRED })
  readonly email: string;
}
