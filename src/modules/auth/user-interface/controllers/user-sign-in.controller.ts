import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { EventEmitter2 as EventEmitter } from "@nestjs/event-emitter";

import { UserSignInService } from "../../services/user-sign-in.service";

import { UserSignInData } from "../inputs/user-sign-in.input";
import { Session } from "../outputs/session.output";

@Controller("user")
export class UserSignInController {
  constructor(
    private readonly eventEmitter: EventEmitter,
    private readonly user: UserSignInService,
  ) {}

  @Post("sign-in")
  @HttpCode(HttpStatus.CREATED)
  async userSignIn(@Body() data: UserSignInData): Promise<Session> {
    const { user, accessToken } = await this.user.userSignIn(data);
    this.eventEmitter.emit("user.signed-in", { user });
    return new Session({ accessToken });
  }
}
