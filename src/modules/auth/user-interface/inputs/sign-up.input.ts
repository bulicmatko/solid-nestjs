import {
  IsDefined,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

import { UnprocessableFieldCode } from "../../../../user-interface/outputs/unprocessable.output";

import { IsUniqueEmail } from "../decorators/is-unique-email.decorator";

export class SignUpData {
  @MaxLength(32, { message: UnprocessableFieldCode.TOO_LONG })
  @MinLength(2, { message: UnprocessableFieldCode.TOO_SHORT })
  @IsString({ message: UnprocessableFieldCode.INVALID })
  @IsDefined({ message: UnprocessableFieldCode.REQUIRED })
  readonly firstName: string;

  @MaxLength(32, { message: UnprocessableFieldCode.TOO_LONG })
  @MinLength(2, { message: UnprocessableFieldCode.TOO_SHORT })
  @IsString({ message: UnprocessableFieldCode.INVALID })
  @IsDefined({ message: UnprocessableFieldCode.REQUIRED })
  readonly lastName: string;

  @IsUniqueEmail({ message: UnprocessableFieldCode.NOT_UNIQUE })
  @MaxLength(320, { message: UnprocessableFieldCode.TOO_LONG })
  @IsEmail({ message: UnprocessableFieldCode.INVALID })
  @IsString({ message: UnprocessableFieldCode.INVALID })
  @IsDefined({ message: UnprocessableFieldCode.REQUIRED })
  readonly email: string;

  @MaxLength(72, { message: UnprocessableFieldCode.TOO_LONG })
  @MinLength(8, { message: UnprocessableFieldCode.TOO_SHORT })
  @IsString({ message: UnprocessableFieldCode.INVALID })
  @IsDefined({ message: UnprocessableFieldCode.REQUIRED })
  readonly password: string;
}
