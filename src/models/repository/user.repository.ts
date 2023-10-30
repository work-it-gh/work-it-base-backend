import { Repository, DataSource } from "typeorm";

import { User } from "../entity/user.entity";
import { AppDataSource } from "../connection";
import { IUser } from "../../../types";

export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(user: IUser) {
    return await this.save({
      id: user.id,
      email: user.email,
      password: user.password,
      phone: user.phone,
    });
  }

  async findUserById(id: string) {
    return await this.findOneBy({ id });
  }

  async findUser(email?: string, phone?: string) {
    return await this.findOne({ where: [{ email }, { phone }] });
  }

  async udpateUser(userId: string, user: IUser) {
    const _user = await this.findOne({ where: { id: userId } });

    if (!_user) {
      return;
    }

    _user.email = user.email;
    _user.phone = user.phone;
    _user.password = user.password;

    return await this.save(_user);
  }

  async deleteUserById(id: string) {
    return await this.delete({ id });
  }
}

export const UserRepositorySingleton = new UserRepository(AppDataSource);
