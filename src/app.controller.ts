import { Controller, Get, HttpCode } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  @HttpCode(201)
  helloWorld(): string {
    return "Hello World!";
  }
}
