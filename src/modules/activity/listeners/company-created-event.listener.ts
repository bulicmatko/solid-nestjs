import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";

import { ActivityCreateOneService } from "../services/activity-create-one.service";

interface CompanyCreatedEvent {
  readonly company: {
    readonly id: string;
    readonly name: string;
  };
  readonly user: {
    readonly id: string;
  };
}

@Injectable()
export class CompanyCreatedEventListener {
  constructor(private readonly activity: ActivityCreateOneService) {}

  @OnEvent("company.created")
  async handle({ company, user }: CompanyCreatedEvent): Promise<void> {
    // TODO: Add event data validation.

    await this.activity.createOne(
      { action: "create", subject: "company", meta: { company, user } },
      { user: { id: user.id } },
    );
  }
}
