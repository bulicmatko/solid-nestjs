import {
  IsDefined,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

import { BadRequestCode } from "../../../../user-interface/outputs/bad-request.output";

import { IsUniqueEmail } from "../decorators/is-unique-email.decorator";

export class SignUpData {
  @MaxLength(32, { message: BadRequestCode.TOO_LONG })
  @MinLength(2, { message: BadRequestCode.TOO_SHORT })
  @IsString({ message: BadRequestCode.INVALID })
  @IsDefined({ message: BadRequestCode.REQUIRED })
  readonly firstName: string;

  @MaxLength(32, { message: BadRequestCode.TOO_LONG })
  @MinLength(2, { message: BadRequestCode.TOO_SHORT })
  @IsString({ message: BadRequestCode.INVALID })
  @IsDefined({ message: BadRequestCode.REQUIRED })
  readonly lastName: string;

  @IsUniqueEmail({ message: BadRequestCode.NOT_UNIQUE })
  @MaxLength(320, { message: BadRequestCode.TOO_LONG })
  @IsEmail({ message: BadRequestCode.INVALID })
  @IsString({ message: BadRequestCode.INVALID })
  @IsDefined({ message: BadRequestCode.REQUIRED })
  readonly email: string;

  @MaxLength(72, { message: BadRequestCode.TOO_LONG })
  @MinLength(8, { message: BadRequestCode.TOO_SHORT })
  @IsString({ message: BadRequestCode.INVALID })
  @IsDefined({ message: BadRequestCode.REQUIRED })
  readonly password: string;
}
