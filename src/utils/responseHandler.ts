import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import secret from '../config/secret'
import { __ } from './function'

// const capitalizeFirstLetter = (word: string) => {
//   return word.charAt(0).toUpperCase() + word.slice(1)
// }

export const middleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) return sendError(res, 400, __('credentials_failed'))
  next()
}

export const validation = (req: Request, res: Response, next: NextFunction) => {
  if (!sendValidation(req, res)) return
  next()
}

export const sendSuccess = (res: Response, message: any) => {
  res.status(200).json({
    success: true,
    message,
  })
}

export const sendData = (res: Response, data: any, message: any) => {
  res.status(200).json({
    success: true,
    data,
    message,
  })
}

export const sendDataExtra = (res: Response, data: any, message: any) => {
  res.status(200).json({
    success: true,
    data,
    extra: {
      total: data?.length,
    },
    message,
  })
}

export const sendError = (res: Response, status: number = 400, message: any) => {
  res.status(status).json({
    success: false,
    message,
  })
}

export const sendValidation = (req: Request, res: Response): boolean => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const newErr = errors.mapped()
    let setErr: any = new Object()
    let firstErr = ''

    for (const err of Object.keys(newErr)) {
      const createErr = newErr[err].msg
      if (firstErr === '') {
        firstErr = createErr
      }
      setErr[err] = createErr
    }

    res.status(400).json({
      success: false,
      errors: setErr,
      message: firstErr.toLowerCase(),
    })

    return false
  }
  return true
}

export const sendCrash = (res: Response, message: any) => {
  res.status(500).json({
    success: false,
    message: secret.NODE_ENV === 'production' ? __('something_went_wrong') : message,
  })
}
