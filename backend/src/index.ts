/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import env from './config/env'
import cors from 'cors'
import { routes } from './routes'

const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)

app.listen(env.port, () => { console.log(`Listening on port ${env.port}`) })
