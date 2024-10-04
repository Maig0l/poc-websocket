import { io, Socket } from 'socket.io-client'
import process from 'node:process'
import { Worker } from './Worker.js'
import { randomUUID } from 'node:crypto'

process.title = 'MTT-brand WS Measuring tape'

const HOST = process.env.SRV_HOST || "localhost"
const PORT = process.env.SRV_PORT || 8080
const CONNECTION_STR = `ws://${HOST}:${PORT}`

const N_CONNECTIONS = 1000;

const proletariado: Worker[] = []

for (let i = 1; i <= N_CONNECTIONS; i++) {
  let camaradas = proletariado.push(new Worker())
  proletariado[camaradas - 1].connectTo(CONNECTION_STR)
}

const latencyRecords: number[] = [];

let progress = 0;
function printProgress() {
  progress++;
  if (progress % 10 == 0) console.log(progress)
}

// use promises to have all workers emit asynchronously and without order
// https://gist.github.com/joeytwiddle/37d2085425c049629b80956d3c618971

await Promise.all(proletariado.map(async (worker) => {
  const startTime = Date.now();
  latencyRecords.push(await worker.measure());
}))

let meanLatency = 0;
await latencyRecords.forEach(val => meanLatency += val)
meanLatency /= latencyRecords.length;

console.log(`=== Min. latency: ${Math.min(...latencyRecords)} ms`)
console.log(`=== Max. latency: ${Math.max(...latencyRecords)} ms`)
console.log(`=== Mean latency: ${meanLatency} ms`)
