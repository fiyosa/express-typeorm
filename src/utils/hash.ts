import Hashids from 'hashids'
import env from '../config/env'

const hashids = new Hashids(env.NODE_KEY, 10)

export const encodeId = (data: number | string): string => {
  try {
    const newData = parseInt(data as string)
    return hashids.encode([newData])
  } catch (err) {
    return ''
  }
}

export const decodeId = (data: string): number => {
  try {
    return (hashids.decode(data)[0] ?? -1) as number
  } catch (err) {
    return -1
  }
}
