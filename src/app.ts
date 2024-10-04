import Express, { request, response } from 'express';
import logger from 'morgan';
import { createServer } from 'node:http'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { Server } from 'socket.io';
import { access } from 'node:fs';
import cors from 'cors';
import process from 'node:process';

process.title = 'MTT-brand WS Server'

const __dirname = dirname(fileURLToPath(import.meta.url))
const __public = join(__dirname, "../public")

const app = Express();
const http = createServer(app);
const io = new Server(http, { cors: { origin: "*" } });

app.use(logger('dev'))
app.use(cors({ origin: "*" }))

app.get("/", (req, res) => { res.redirect('/index.html') })

app.get('/:file', (req, res, next) => {
  const path = join(__public, req.params.file)

  access(path, (err) => {
    if (err) // file doesn't exist
      return next()

    console.log(`requested file '${req.params.file}'`)
    res.sendFile(path)
  })
})

setInterval(() => {
  const stamp = (new Date).toTimeString();
  console.log(`< ${stamp} - ${io.engine.clientsCount} clients`)

  io.emit('time', stamp);
}, 1000)

// For every new connection to the Socket.io server, we have a `socket` object
// representing that connection
io.on('connection', (socket) => {
  const sockSlug = socket.id.substring(0, 5)
  io.emit('userCount', io.engine.clientsCount)

  socket.on('disconnect', () => {
    io.emit('userCount', io.engine.clientsCount)
  })

  // 'message' is an arbitrary event name we can define
  //  and listen for in the server.
  // Message events are sent by the client
  socket.on('message', (messageText) => {
    console.log(`> ${sockSlug} says: ${messageText}`)

    // We emit a message event from the Socket.io server itself
    // to broadcast the event to _all_ clients
    io.emit('message', messageText)
    console.log(`< Broadcasting "${messageText}"`)
  })

  socket.on('bench', (payload) => {
    socket.emit('bench', payload)
  })
})


// We need the *HTTP SERVER* to listen for connections
// Express has the Request handlers and socket.io has the WS handlers
// Both connect via node's http module
const PORT = 8080
http.listen(PORT)
console.log(`Listening on http://localhost:${PORT}`)
