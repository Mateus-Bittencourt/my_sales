import { IUserToken } from '../models/IUserToken'

export interface IUserTokensRepository {
  findByToken(token: string): Promise<IUserToken | null>
  generate(userId: number): Promise<IUserToken>
}