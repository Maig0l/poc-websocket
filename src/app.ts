import Express, { request, response } from 'express';
import logger from 'morgan';
import { createServer } from 'node:http'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { Server } from 'socket.io';
import { access } from 'node:fs';
import cors from 'cors';

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

// For every new connection to the Socket.io server, we have a `socket` object
// representing that connection
io.on('connection', (socket) => {
  console.log(`New connection established`)

  socket.on('disconnect', () => {
    console.log("Client disconnected")
  })

  // 'message' is an arbitrary event name we can define
  //  and listen for in the server.
  // Message events are sent by the client
  socket.on('message', (messageText) => {
    console.log(`A client says: ${messageText}`)

    // We emit a message event from the Socket.io server itself
    // to broadcast the event to _all_ clients
    io.emit('message', messageText)
  })
})


// We need the *HTTP SERVER* to listen for connections
// Express has the Request handlers and socket.io has the WS handlers
// Both connect via node's http module
const PORT = 8080
http.listen(PORT)
console.log(`Listening on http://localhost:${PORT}`)
