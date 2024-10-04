import { io, Socket } from 'socket.io-client';
import { UUID, randomUUID } from 'node:crypto'

enum WorkerStatus {
  Dead,
  Connected,
  Spamming,
}

export class Worker {
  status: WorkerStatus;
  client!: Socket;
  payload!: UUID

  constructor() {
    this.status = WorkerStatus.Dead;
    this.payload = randomUUID();
  }

  connectTo(destination: string) {
    this.client = io(destination)
    this.client.on('connect', () => {
      this.status = WorkerStatus.Connected;
    })
  }

  async measure(): Promise<number> {
    const startTime = Date.now();
    this.client.emit('bench', this.payload)

    return new Promise<number>(resolve => {
      this.client.on('bench', (ev) => {
        resolve(Date.now() - startTime)
      })
    })
  }
}
