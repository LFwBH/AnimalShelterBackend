import { Injectable } from "@nestjs/common";
import { Income as PrismaIncome } from "@prisma/client";
import { classToPlain, plainToClass } from "class-transformer";
import { EntityMapper } from "common/EntityMapper";

import { IncomeEntity } from "./income.entity";
import { IncomeModel } from "./income.model";

@Injectable()
export class IncomeMapper implements EntityMapper<PrismaIncome, IncomeModel> {
  toEntity(income: PrismaIncome): IncomeModel {
    const incomeEntity = plainToClass<
      IncomeEntity,
      Omit<IncomeModel, "fullName">
    >(IncomeEntity, {
      id: income.id_income,
      amount: income.amount,
      firstName: income.first_name,
      lastName: income.last_name,
      createdAt: income.created_at,
      updatedAt: income.updated_at,
    });

    return classToPlain(incomeEntity) as IncomeModel;
  }
}
