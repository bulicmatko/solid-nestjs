import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";

import { ActivityCreateOneService } from "../services/activity-create-one.service";

interface CompanyCreatedEvent {
  readonly company: {
    readonly id: number;
    readonly name: string;
  };
  readonly user: {
    readonly id: number;
  };
}

@Injectable()
export class CompanyCreatedListener {
  constructor(private readonly activity: ActivityCreateOneService) {}

  @OnEvent("company.created")
  async createCompanyCreatedActivity({
    company,
    user,
  }: CompanyCreatedEvent): Promise<void> {
    // TODO: Add event data validation.

    await this.activity.createOne(
      { action: "create", subject: "company", meta: { company, user } },
      { user: { id: user.id } },
    );
  }
}
