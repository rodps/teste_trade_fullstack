import express, { type Request, type Response } from 'express'

const app = express()

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'hello world' })
})

app.listen(3000, () => { console.log('server running on port 3000') })
