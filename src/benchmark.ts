import { io, Socket } from 'socket.io-client'
import process from 'node:process'
import { Worker } from './Worker.js'

const HOST = process.env.SRV_HOST || "localhost"
const PORT = process.env.SRV_PORT || 8080
const CONNECTION_STR = `ws://${HOST}:${PORT}`

const N_CONNECTIONS = 100;

const proletariado: Worker[] = []

for (let i = 1; i <= N_CONNECTIONS; i++) {
  let camarada = proletariado.push(new Worker())
  proletariado[camarada - 1].connectTo(CONNECTION_STR)
}
