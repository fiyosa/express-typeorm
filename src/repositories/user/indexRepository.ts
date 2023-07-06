import { Request } from 'express'
import { ILike } from 'typeorm'
import db from '../../config/db'
import { users } from '../../database/entities/users.entity'

export const index = async (req: Request) => {
  try {
    const page = req.query?.page || '1'
    const limit = req.query?.limit || '10'
    const keyword = req.query?.keyword || ''

    const result = await db.manager.getRepository(users).find({
      skip: parseInt(page as string) < 1 ? 0 : (parseInt(page as string) - 1) * parseInt(limit as string),
      take: parseInt(limit as string),
      order: { id: 'ASC' },
      where: [
        //
        { email: ILike(`%${keyword}%`) },
        { username: ILike(`%${keyword}%`) },
        { name: ILike(`%${keyword}%`) },
      ],
      relations: {
        room_chats: true,
      },
    })

    return result
  } catch (err) {
    return []
  }
}
