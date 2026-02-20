import type { RequestHandler } from 'express'
import type { ResType } from '../@types/res'

const healthController: RequestHandler = (_req, res) => {
  res.status(200).json({
    success: true,
    data: {
      msg: `running`,
    },
  } satisfies ResType)
}

export { healthController }
