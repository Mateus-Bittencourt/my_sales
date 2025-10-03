import RedisCache from '@shared/cache/RedisCache'
import { RedisOptions } from 'ioredis'

interface ICacheConfig {
  driver: 'redis'
  config: {
    redis: RedisOptions
  }
}

export default {
  driver: 'redis',
  config: {
    redis: {
      host: process.env.redis_host,
      port: process.env.redis_port,
      password: process.env.redis_password || undefined,
    },
  },
} as ICacheConfig

export const redisCache = new RedisCache()
