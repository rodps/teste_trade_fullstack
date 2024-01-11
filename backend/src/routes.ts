/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { loginController } from './controllers/login.controller'
import { wrapper } from './controllers/wrapper'

const routes = Router()

routes.post('/login', wrapper(loginController))

export { routes }
