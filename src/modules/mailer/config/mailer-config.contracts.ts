import { IsDefined, IsEmail, IsInt, IsString } from "class-validator";

export class MailerConfig {
  @IsEmail()
  @IsString()
  @IsDefined()
  readonly SMTP_EMAIL: string;

  @IsString()
  @IsDefined()
  readonly SMTP_HOST: string;

  @IsInt()
  @IsDefined()
  readonly SMTP_PORT: number;

  @IsString()
  @IsDefined()
  readonly SMTP_USER: string;

  @IsString()
  @IsDefined()
  readonly SMTP_PASS: string;
}
