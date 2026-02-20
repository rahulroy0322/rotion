import { Redis } from 'ioredis'
import ENV, { isDev } from '../config/env.config'
import logger from '../logger/pino'

// @ts-expect-error
const redis = new Redis(ENV.REDIS_URI, {
  tls: !isDev,
  lazyConnect: true,
  autoResubscribe: true,
  reconnectOnError: true,
})

redis.on('error', (err) => {
  logger.error(err, `ERROR CACAHE CONNECT: `)
})

redis.on('connect', () => {
  logger.debug(`cache conected`)
})

redis.on('connecting', () => {
  logger.debug(`cache connecting...`)
})

redis.on('ready', () => {
  logger.debug(`cache is now ready...`)
})

const connectCache = () => {
  redis.connect()
  return redis
}

const closeCache = () => {
  if (!redis) {
    return
  }

  redis.disconnect(false)
}

export { redis, closeCache, connectCache }
