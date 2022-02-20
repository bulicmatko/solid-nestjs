import { IsDefined, IsString, MinLength } from "class-validator";

export class AuthConfig {
  @MinLength(8)
  @IsString()
  @IsDefined()
  readonly JWT_SECRET: string;
}
