/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { loginController } from './controllers/login.controller'
import { wrapper } from './controllers/wrapper'
import { registerController } from './controllers/register.controller'

const routes = Router()

routes.post('/login', wrapper(loginController))
routes.post('/register', wrapper(registerController))

export { routes }
