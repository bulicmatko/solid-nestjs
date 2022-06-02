import { Injectable } from "@nestjs/common";
import { addHours } from "date-fns";
import { v4 as uuidV4 } from "uuid";

@Injectable()
export class EmailService {
  getConfirmationCode(): string {
    return uuidV4();
  }

  getConfirmationCodeExpirationDate(): Date {
    return addHours(new Date(), 24);
  }
}
