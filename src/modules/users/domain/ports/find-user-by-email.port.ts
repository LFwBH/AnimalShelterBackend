import { UserModel } from "../models/user.model";

export interface FindUserByEmailPort extends Pick<UserModel, "email"> {}
