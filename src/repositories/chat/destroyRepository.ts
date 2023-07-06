import db from '../../config/db'
import { chats } from '../../database/entities/chats.entity'
import { decodeId } from '../../utils'

export const destroy = async (chat_id: string) => {
  try {
    await db.manager.getRepository(chats).update({ id: decodeId(chat_id) }, { revoked: true })

    return true
  } catch (err) {
    return false
  }
}
