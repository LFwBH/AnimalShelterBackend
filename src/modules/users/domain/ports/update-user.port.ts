import { UserModel } from "../models/user.model";

export interface UpdateUserPort
  extends Omit<UserModel, "createdAt" | "updatedAt"> {}
