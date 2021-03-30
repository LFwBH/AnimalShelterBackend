import { UserModel } from "../models/user.model";

export interface CreateUserPort extends Pick<UserModel, "email" | "password"> {}
