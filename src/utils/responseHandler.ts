import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import env from '../config/env'
import { __ } from './function'

const capitalizeFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1)
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
    res.status(400).json({
      success: false,
      // errors: errors.array(),
      errors: errors.mapped(),
      message: `${capitalizeFirstLetter(errors.array()[0].type)} invalid.`,
    })
    return false
  }
  return true
}

export const sendCrash = (res: Response, message: any) => {
  res.status(500).json({
    success: false,
    message: env.NODE_ENV === 'production' ? __('something_went_wrong') : message,
  })
}
