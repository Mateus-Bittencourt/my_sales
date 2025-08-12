import { AppDataSource } from "@shared/typeorm/data-source";
import { UserToken } from "../entities/UserToken";

export const userTokensRepositories = AppDataSource.getRepository(UserToken).extend({
  async findByToken(token: string): Promise<UserToken | null> {
    return this.findOneBy({ token });
  },

  async generate(userId: number): Promise<UserToken | null> {
    const userToken = this.create({ user_id: userId })
    await this.save(userToken)
    return userToken
  },
})
