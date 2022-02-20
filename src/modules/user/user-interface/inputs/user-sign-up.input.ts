import { IsDefined, IsEmail, IsString, MaxLength } from "class-validator";

export class UserSignUpData {
  @MaxLength(320)
  @IsEmail()
  @IsString()
  @IsDefined()
  readonly email: string;
}
