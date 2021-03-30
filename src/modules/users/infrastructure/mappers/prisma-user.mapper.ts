import { Prisma } from "@prisma/client";

import { UserEntity } from "../entities/user.entity";

type PrismaUser = Prisma.UserGetPayload<null>;

export class PrismaUserMapper {
  static async toPrismaUser(user: UserEntity): Promise<PrismaUser> {
    return {
      id_user: user.id,
      email: user.email,
      password: user.password,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    };
  }

  static async toEntityUser(user: PrismaUser): Promise<UserEntity> {
    return UserEntity.new({
      id: user.id_user,
      email: user.email,
      password: user.password,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    });
  }
}
