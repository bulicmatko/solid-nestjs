import { Body, Controller, HttpCode, Post } from "@nestjs/common";

import { PubSubService } from "../../../pub-sub/services/pub-sub.service";

import { UserCreateOneService } from "../../services/user-create-one.service";

import { UserSignUpData } from "../inputs/user-sign-up.input";

@Controller("user")
export class UserSignUpController {
  constructor(
    private readonly pubSub: PubSubService,
    private readonly user: UserCreateOneService,
  ) {}

  @Post("sign-up")
  @HttpCode(201)
  async userSignUp(@Body() data: UserSignUpData): Promise<void> {
    const user = await this.user.createOne(data);
    return this.pubSub.publish("user.signed-up", user);
  }
}
