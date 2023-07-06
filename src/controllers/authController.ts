import { NextFunction, Request, Response } from 'express'
import { sendData, sendDataExtra, sendError, __ } from '../utils'
import { userResource } from '../resources'
import { userRepository } from '../repositories'

export const middleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) return sendError(res, 400, __('credentials_failed'))
  next()
}

export const hash = async (req: Request, res: Response) => {
  const users = await userRepository.index(req)

  return sendDataExtra(res, userResource.index(users), __('retrieved_successfully', { operator: __('user') }))
}

export const index = async (req: Request, res: Response) => {
  const users = await userRepository.index(req)

  return sendDataExtra(res, userResource.index(users), __('retrieved_successfully', { operator: __('user') }))
}

export const show = async (req: Request, res: Response) => {
  const user = await userRepository.show(req)

  if (!user) return sendError(res, 404, __('not_found', { operator: __('user') }))

  return sendData(res, userResource.show(user), __('retrieved_successfully', { operator: __('user') }))
}
