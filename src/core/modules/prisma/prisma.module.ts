import { Module } from "@nestjs/common";

import { PrismaConfigModule } from "./config/prisma-config.module";
import { PrismaService } from "./services/prisma.service";

@Module({
  imports: [PrismaConfigModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
