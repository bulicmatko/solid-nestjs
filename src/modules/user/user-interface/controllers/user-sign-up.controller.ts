import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { EventEmitter2 as EventEmitter } from "@nestjs/event-emitter";

import { UserCreateOneService } from "../../services/user-create-one.service";

import { UserSignUpData } from "../inputs/user-sign-up.input";

@Controller("user")
export class UserSignUpController {
  constructor(
    private readonly eventEmitter: EventEmitter,
    private readonly user: UserCreateOneService,
  ) {}

  @Post("sign-up")
  @HttpCode(201)
  async userSignUp(@Body() data: UserSignUpData): Promise<void> {
    const user = await this.user.createOne(data);
    this.eventEmitter.emit("user.signed-up", { user });
  }
}
