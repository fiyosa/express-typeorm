import Hashids from 'hashids'
import secret from '../config/secret'

const hashids = new Hashids(secret.NODE_KEY, 10)

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
