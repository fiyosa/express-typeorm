import { Request, Response } from 'express'
import { sendCrash, sendData, sendError, sendSuccess, __ } from '../utils'
import { chatResource } from '../resources'
import { chatRepository } from '../repositories'

export const show = async (req: Request, res: Response) => {
  const room_chat_id = req.query?.room_chat_id || ''

  const chats = await chatRepository.show(room_chat_id as string)

  return sendData(res, chatResource.show(chats), __('retrieved_successfully', { operator: __('room_chat') }))
}

export const store = async (req: Request, res: Response) => {
  const room_chat_id = req.body?.room_chat_id || ''
  const user_id = req.body?.user_id || ''
  const message = req.body?.message || ''

  const chat = await chatRepository.store({ room_chat_id, user_id, message })

  if (typeof chat === 'string') return sendCrash(res, chat)

  if (!chat) return sendError(res, 400, __('save_failed', { operator: __('chat') }))

  return sendSuccess(res, __('saved_successfully', { operator: __('chat') }))
}

export const destroy = async (req: Request, res: Response) => {
  const chat_id = req.params?.id || ''

  const result = await chatRepository.destroy(chat_id)

  if (typeof result === 'string') return sendCrash(res, result)

  if (!result) return sendError(res, 400, __('delete_failed', { operator: __('chat') }))

  return sendSuccess(res, __('deleted_successfully', { operator: __('chat') }))
}
