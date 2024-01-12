/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { loginController } from './controllers/login.controller'
import { wrapper } from './controllers/wrapper'
import { registerController } from './controllers/register.controller'
import { createTeamController } from './controllers/create-team.controller'
import { authMiddleware } from './middleware/auth.middleware'

const routes = Router()

routes.post('/login', wrapper(loginController))
routes.post('/register', wrapper(registerController))

routes.post('/teams', authMiddleware, wrapper(createTeamController))

export { routes }
