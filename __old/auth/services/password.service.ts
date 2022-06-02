import { Injectable } from "@nestjs/common";
import { compare, genSalt, hash } from "bcrypt";
import { addHours } from "date-fns";
import { v4 as uuidV4 } from "uuid";

@Injectable()
export class PasswordService {
  async hash(password: string): Promise<string> {
    const salt = await genSalt(10);
    return hash(password, salt);
  }

  compare(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }

  getResetCode(): string {
    return uuidV4();
  }

  getResetCodeExpirationDate(): Date {
    return addHours(new Date(), 24);
  }
}
