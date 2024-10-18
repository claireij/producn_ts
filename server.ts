const express = require("express")
const next = require("next")

const fs = require('fs');
const util = require('util');
const log_file = fs.createWriteStream(__dirname + '/debug.log', {flags: 'w'});
const log_stdout = process.stdout;

console.log = (d, e, f, g) => {
  log_file.write(util.format('LOG: ', d?d:'', e?e:'', f?f:'', g?g:'') + '\n');
  log_stdout.write(util.format('LOG: ', d?d:'', e?e:'', f?f:'', g?g:'') + '\n');
}

console.error = (d, e, f, g) => {
  log_file.write(util.format('ERROR: ', d?d:'', e?e:'', f?f:'', g?g:'') + '\n');
  log_stdout.write(util.format('ERROR: ', d?d:'', e?e:'', f?f:'', g?g:'') + '\n');
}

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
