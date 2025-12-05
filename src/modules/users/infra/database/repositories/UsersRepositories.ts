// import { User } from '../entities/User'

// export const usersRepositories = AppDataSource.getRepository(User).extend({
//   async findByName(name: string): Promise<User | null> {
//     return this.findOneBy({ name })
//   },
//   async findById(id: number): Promise<User | null> {
//     return this.findOneBy({ id })
//   },
//   async findByEmail(email: string): Promise<User | null> {
//     return this.findOneBy({ email })
//   },
// })

import { AppDataSource } from '@shared/infra/typeorm/data-source'
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository'
import { Repository } from 'typeorm'
import { User } from '../entities/User'
import { IUser } from '@modules/users/domain/models/IUser'
import { ICreateUser } from '@modules/users/domain/models/ICreateUser'

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(User)
  }

  public async create(data: ICreateUser): Promise<IUser> {
    const entity = this.ormRepository.create(data)
    return this.ormRepository.save(entity)
  }

  public async findById(id: number): Promise<IUser | null> {
    return this.ormRepository.findOneBy({ id })
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    return this.ormRepository.findOneBy({ email })
  }
}
