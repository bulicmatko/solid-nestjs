import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MailerConfigService extends ConfigService {
  getSmtpEmail(): string {
    return this.get<string>("SMTP_EMAIL", "noreply@example.com");
  }

  getSmtpHost(): string {
    return this.get<string>("SMTP_HOST", "smtp.example.com");
  }

  getSmtpPort(): number {
    return this.get<number>("SMTP_PORT", 587);
  }

  getSmtpUser(): string {
    return this.get<string>("SMTP_USER", "user");
  }

  getSmtpPass(): string {
    return this.get<string>("SMTP_PASS", "password");
  }
}
