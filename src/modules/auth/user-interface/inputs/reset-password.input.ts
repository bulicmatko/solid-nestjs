import {
  IsDefined,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from "class-validator";

export class ResetPasswordData {
  @IsUUID()
  @IsString()
  @IsDefined()
  readonly code: string;

  @MaxLength(72)
  @MinLength(8)
  @IsString()
  @IsDefined()
  readonly password: string;
}
