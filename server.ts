const express = require("express")
const next = require("next")

const dev: boolean = process.env.NODE_ENV !== "production"
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

const port: number = 3454

nextApp.prepare().then(() => {
  const app = express()

  app.get("*", (req: any, res: any) => {
    return handle(req, res)
  })

  app.listen(port, (err?: Error) => {
    if (err) throw err
    console.log(`> Ready on localhost:${port}`)
  })
})
