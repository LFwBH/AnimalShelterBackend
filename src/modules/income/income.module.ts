import { Module } from "@nestjs/common";

import { PrismaService } from "../../services/prisma.service";
import { IncomeController } from "./income.controller";
import { IncomeMapper } from "./income.mapper";

@Module({
  controllers: [IncomeController],
  providers: [PrismaService, IncomeMapper],
})
export class IncomeModule {}
