const express = require("express")
const next = require("next")

const fs = require('fs');
const util = require('util');

const log_file = fs.createWriteStream(__dirname + '/debug.log', { flags: 'a' });
const log_stdout = process.stdout;
const date = new Date()

console.log = function (...args) {
  const logMessage = util.format(...args);
  log_file.write('LOG: ' + date + logMessage + '\n');
  log_stdout.write('LOG: ' + date +  logMessage + '\n');
}

console.error = function (...args) {
  const errorMessage = util.format(...args);
  log_file.write('ERROR: ' + date + errorMessage + '\n');
  log_stdout.write('ERROR: ' + date + errorMessage + '\n');
}

const dev = process.env.NODE_ENV !== "production"
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

const port = 3454

nextApp.prepare().then(() => {
  const app = express()

  app.use((req, res, next) => {
    const startTime = Date.now();

    console.log(`[REQUEST] ${date} ${req.method} ${req.url} - Body: ${JSON.stringify(req.body || {})}`);

    res.on('finish', () => {
      const duration = Date.now() - startTime;
      console.log(`[RESPONSE] ${date} ${req.method} ${req.url} - Status: ${res.statusCode} - Duration: ${duration}ms`);
    });

    next();
  });

  app.all("*", (req, res) => {
    return handle(req, res);
  })

  app.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on localhost:${port}`)
  })
})
