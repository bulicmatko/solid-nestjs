import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";

import { ActivityCreateOneService } from "../services/activity-create-one.service";

interface UserSignInEvent {
  readonly user: {
    readonly id: number;
    readonly email: string;
  };
}

@Injectable()
export class UserSignedInEventListener {
  constructor(private readonly activity: ActivityCreateOneService) {}

  @OnEvent("user.signed-in")
  async handle({ user }: UserSignInEvent): Promise<void> {
    // TODO: Add event data validation.

    await this.activity.createOne(
      { action: "sign-in", subject: "user", meta: { user } },
      { user: { id: user.id } },
    );
  }
}
