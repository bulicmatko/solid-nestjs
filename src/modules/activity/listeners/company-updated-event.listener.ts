import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";

import { ActivityCreateOneService } from "../services/activity-create-one.service";

interface CompanyUpdatedEvent {
  readonly company: {
    readonly id: number;
    readonly name: string;
  };
  readonly user: {
    readonly id: number;
  };
}

@Injectable()
export class CompanyUpdatedEventListener {
  constructor(private readonly activity: ActivityCreateOneService) {}

  @OnEvent("company.updated")
  async handle({ company, user }: CompanyUpdatedEvent): Promise<void> {
    // TODO: Add event data validation.

    await this.activity.createOne(
      { action: "update", subject: "company", meta: { company, user } },
      { user: { id: user.id } },
    );
  }
}
