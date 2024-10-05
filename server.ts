import express, { Request, Response } from "express"
import next from "next"

const dev: boolean = process.env.NODE_ENV !== "production"
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

const port: number = 3454

nextApp.prepare().then(() => {
  const app = express()

  app.get("*", (req: Request, res: Response) => {
    return handle(req, res)
  })

  app.listen(port, (err?: any) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
