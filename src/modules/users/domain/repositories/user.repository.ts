import { Optional } from "../../../../common/Optional";
import { RepositoryPageOptions } from "../../../../common/RepositoryPageOptions";
import { UserModel } from "../models/user.model";
import { CreateUserPort } from "../ports/create-user.port";
import { FindUserByEmailPort } from "../ports/find-user-by-email.port";
import { UpdateUserPort } from "../ports/update-user.port";

export interface UserRepository {
  create(user: CreateUserPort): Promise<UserModel>;

  update(overrides: UpdateUserPort): Promise<UserModel>;

  findByEmail(user: FindUserByEmailPort): Promise<Optional<UserModel>>;

  findAll(page: RepositoryPageOptions): Promise<Iterable<UserModel>>;
}
