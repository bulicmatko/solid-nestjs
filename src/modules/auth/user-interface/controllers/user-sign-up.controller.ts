import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { EventEmitter2 as EventEmitter } from "@nestjs/event-emitter";

import { UserSignUpService } from "../../services/user-sign-up.service";

import { UserSignUpData } from "../inputs/user-sign-up.input";

@Controller("user")
export class UserSignUpController {
  constructor(
    private readonly eventEmitter: EventEmitter,
    private readonly user: UserSignUpService,
  ) {}

  @Post("sign-up")
  @HttpCode(HttpStatus.CREATED)
  async userSignUp(@Body() data: UserSignUpData): Promise<void> {
    const user = await this.user.userSignUp(data);
    this.eventEmitter.emit("user.signed-up", { user });
  }
}
