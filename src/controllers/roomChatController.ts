import { Request, Response } from 'express'
import { sendData, __ } from '../utils'
import { roomChatResource } from '../resources'
import { roomChatRepository } from '../repositories'

export const show = async (req: Request, res: Response) => {
  const user_id = (req.query?.user_id as string) || ''
  const type = (req.query?.type as string) || ''

  const rooms = await roomChatRepository.show({ user_id, type })

  return sendData(
    res,
    roomChatResource.show(rooms, user_id),
    __('retrieved_successfully', { operator: __('room_chat') })
  )
}
