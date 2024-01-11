import express, { type Request, type Response } from 'express'
import env from './config/env'

const app = express()

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'hello world' })
})

app.listen(env.port, () => { console.log('server running on port 3000') })
