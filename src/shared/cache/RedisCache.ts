import Redis, { Redis as RedisClient } from 'ioredis'
import cacheConfig from '@config/cache'

export default class RedisCache {
  private client: RedisClient

  constructor() {
    this.client = new Redis(cacheConfig.config.redis)
  }

  async save(key: string, value: string, ttl?: number): Promise<'OK'> {
    return ttl
      ? await this.client.setex(key, ttl, value)
      : await this.client.set(key, value)
  }

  async recover<T>(key: string): Promise<T | null> {
    try {
      const data = await this.client.get(key)
      if (!data) return null
      return JSON.parse(data) as T
    } catch (error) {
      console.error(`\nRedis recover error: ${error}\n`)
      return null
    }
  }

  async invalidate(key: string): Promise<number> {
    return await this.client.del(key)
  }

  async invalidatePrefix(prefix: string): Promise<void> {
    const keys = await this.client.keys(`${prefix}:*`)
    if (keys.length > 0) {
      await this.client.del(...keys)
    }
  }

  async disconnect(): Promise<void> {
    await this.client.quit()
  }
}
