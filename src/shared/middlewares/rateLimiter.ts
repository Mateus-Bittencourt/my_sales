import AppError from '@shared/erros/AppError'
import { NextFunction, Request, Response } from 'express'
import { RateLimiterRedis } from 'rate-limiter-flexible'
import { createClient } from 'redis'

const redisClient = createClient({
  url: `redis://${process.env.redis_host}:${process.env.redis_port}`,
  password: process.env.redis_password || undefined,
})

redisClient.connect().catch(console.error)

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rate_limiter',
  points: 10, // Number of points
  duration: 1, // Per second
  blockDuration: 60, // Block for 60 seconds if consumed more than points
})

export default async function rateLimiter(
  request: Request,
  _response: Response,
  next: NextFunction
): Promise<void> {
  try {
    await limiter.consume(request.ip as string)
    return next()
  } catch (err) {
    throw new AppError('Too many requests', 429)
  }
}
