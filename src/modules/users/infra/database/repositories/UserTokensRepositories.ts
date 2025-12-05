import { AppDataSource } from '@shared/infra/typeorm/data-source'
import { UserToken } from '../entities/UserToken'
import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository'
import { Repository } from 'typeorm'
import { IUserToken } from '@modules/users/domain/models/IUserToken'

// export const userTokensRepositories = AppDataSource.getRepository(UserToken).extend({
//   async findByToken(token: string): Promise<UserToken | null> {
//     return this.findOneBy({ token });
//   },

//   async generate(userId: number): Promise<UserToken | null> {
//     const userToken = this.create({ user_id: userId })
//     await this.save(userToken)
//     return userToken
//   },
// })

export default class UserTokensRepositories implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(UserToken)
  }

  public async findByToken(token: string): Promise<IUserToken | null> {
    return this.ormRepository.findOneBy({ token })
  }

  public async generate(userId: number): Promise<IUserToken> {
    const userToken = this.ormRepository.create({ userId })
    return this.ormRepository.save(userToken)
  }
}
