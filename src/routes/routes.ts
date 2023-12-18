import { Router } from 'express'
import { chatController, hashController, roomChatController, roomJoinController, userController } from '../controllers'
import { middleware } from '../utils'
import { chatRequest } from '../requests'

const guest = () => {
  const router = Router()
  router.get('/hash-id', hashController.hashId)

  router.get('/user', userController.index)
  router.get('/user/:id', userController.show)

  router.get('/room-chat', roomChatController.show)

  router.get('/room-join', roomJoinController.show)

  router.get('/chat', chatController.show)
  router.post('/chat', chatRequest.store, chatController.store)
  router.delete('/chat/:id', chatController.destroy)

  return router
}

const auth = () => {
  const router = Router()

  router.get('/test', middleware, userController.index)

  return router
}

const routes = { guest, auth }

export default routes
