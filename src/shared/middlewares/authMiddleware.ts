import AppError from '@shared/erros/AppError'
import { NextFunction, Request, Response } from 'express'
import { verify, Secret } from 'jsonwebtoken'

interface ITokenPayload {
  sub: string
  iat: number
  exp: number
}

export default class AuthMiddleware {
  static execute(
    request: Request,
    _response: Response,
    next: NextFunction
  ): void {
    const authHeader = request.headers.authorization

    if (!authHeader) throw new AppError('JWT token is missing.', 401)

    const [, token] = authHeader.split(' ')

    try {
      const decodedToken = verify(token, process.env.app_secret as Secret)

      const { sub } = decodedToken as ITokenPayload

      request.user = {
        id: Number(sub),
      }

      return next()
    } catch {
      throw new AppError('Invalid JWT token.', 401)
    }
  }
}
