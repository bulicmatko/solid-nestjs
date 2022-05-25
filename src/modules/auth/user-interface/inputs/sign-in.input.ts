import { IsDefined, IsEmail, IsString, MaxLength } from "class-validator";

import { UnprocessableFieldCode } from "../../../../core/user-interface/outputs/unprocessable.output";

import { IsExistingEmail } from "../decorators/is-existing-email.decorator";
import { IsConfirmedEmail } from "../decorators/is-confirmed-email.decorator";

export class SignInData {
  @IsConfirmedEmail({ message: UnprocessableFieldCode.NOT_CONFIRMED })
  @IsExistingEmail({ message: UnprocessableFieldCode.NOT_FOUND })
  @MaxLength(320, { message: UnprocessableFieldCode.TOO_LONG })
  @IsEmail({ message: UnprocessableFieldCode.INVALID })
  @IsString({ message: UnprocessableFieldCode.INVALID })
  @IsDefined({ message: UnprocessableFieldCode.REQUIRED })
  readonly email: string;
}
