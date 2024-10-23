import express, { Request, Response, NextFunction } from "express";
import fs from "fs";
import util from "util";
import next from "next";

const log_file = fs.createWriteStream(__dirname + '/debug.log', { flags: 'a' });
const log_stdout = process.stdout;

console.log = function (...args) {
  const logMessage = util.format(...args);
  log_file.write('LOG: ' + logMessage + '\n');
  log_stdout.write('LOG: ' + logMessage + '\n');
}

console.error = function (...args) {
  const errorMessage = util.format(...args);
  log_file.write('ERROR: ' + errorMessage + '\n');
  log_stdout.write('ERROR: ' + errorMessage + '\n');
}

const dev = process.env.NODE_ENV !== "production"
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

const port = 3454

nextApp.prepare().then(() => {
  const app = express()

  app.use((req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();

    console.log(`[REQUEST] ${req.method} ${req.url} - Body: ${JSON.stringify(req.body || {})}`);

    res.on('finish', () => {
      const duration = Date.now() - startTime;
      console.log(`[RESPONSE] ${req.method} ${req.url} - Status: ${res.statusCode} - Duration: ${duration}ms`);
    });

    next();
  });

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
