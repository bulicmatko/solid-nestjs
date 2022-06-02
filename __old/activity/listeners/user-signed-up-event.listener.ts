import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";

import { ActivityCreateOneService } from "../services/activity-create-one.service";

interface UserSignUpEvent {
  readonly user: {
    readonly id: string;
    readonly email: string;
  };
}

@Injectable()
export class UserSignedUpEventListener {
  constructor(private readonly activity: ActivityCreateOneService) {}

  @OnEvent("user.signed-up")
  async handle({ user }: UserSignUpEvent): Promise<void> {
    // TODO: Add event data validation.

    await this.activity.createOne(
      { action: "sign-up", subject: "user", meta: { user } },
      { user: { id: user.id } },
    );
  }
}
