import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";

@Controller()
export class ApplicationController {
  @Get()
  @HttpCode(HttpStatus.OK)
  helloWorld(): string {
    return "Hello World!";
  }
}
