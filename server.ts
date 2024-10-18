const express = require("express")
const next = require("next")

const dev = process.env.NODE_ENV !== "production"
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

const port = 3454

nextApp.prepare().then(() => {
  const app = express()

  //@ts-ignore
  app.all("*", (req, res) => {
    return handle(req, res);
  })

  //@ts-ignore
  app.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on localhost:${port}`)
  })
})
