/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { wrapper } from './controllers/wrapper'
import { authMiddleware } from './middleware/auth.middleware'
import {
  createTeamController,
  deleteTeamController,
  loginController,
  registerController,
  listTeamController
} from './controllers'

const routes = Router()

routes.post('/login', wrapper(loginController))
routes.post('/register', wrapper(registerController))

routes.post('/teams', authMiddleware, wrapper(createTeamController))
routes.delete('/teams/:id', authMiddleware, wrapper(deleteTeamController))
routes.get('/teams', authMiddleware, wrapper(listTeamController))

export { routes }
