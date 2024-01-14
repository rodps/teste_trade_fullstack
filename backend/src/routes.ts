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
import { simulateChampionshipController } from './controllers/simulate-championship.controller'
import { listChampionshipController } from './controllers/list-championship.controller'
import { getChampionshipController } from './controllers/get-championship.controller'
import { oauthGithubController } from './controllers/oauth-github.controller'
import { getHistoricController } from './controllers/get-historic.controller'

const routes = Router()

routes.post('/login', wrapper(loginController))
routes.post('/register', wrapper(registerController))

routes.post('/oauth/github', wrapper(oauthGithubController))

routes.post('/teams', authMiddleware, wrapper(createTeamController))
routes.delete('/teams/:id', authMiddleware, wrapper(deleteTeamController))
routes.get('/teams', authMiddleware, wrapper(listTeamController))

routes.post('/championships/simulate', authMiddleware, wrapper(simulateChampionshipController))
routes.get('/championships', authMiddleware, wrapper(listChampionshipController))
routes.get('/championships/:id', authMiddleware, wrapper(getChampionshipController))
routes.get('/historic', authMiddleware, wrapper(getHistoricController))

export { routes }
