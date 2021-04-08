import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserModel } from "modules/users/domain/models/user.model";

export interface User extends Pick<UserModel, "id" | "email"> {}

export const User = createParamDecorator((__, context: ExecutionContext) => {
  const host = context.switchToHttp();
  const req = host.getRequest();
  return req.user;
});
