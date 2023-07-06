import { Request } from 'express'
import db from '../../config/db'
import { users } from '../../database/entities/users.entity'
import { decodeId } from '../../utils'

export const show = async (req: Request) => {
  try {
    const id = decodeId(req.params.id)

    const result = await db.manager.getRepository(users).findOne({
      where: { id },
      relations: {
        room_chats: true,
      },
    })

    return result
  } catch (err) {
    return null
  }
}
