import { io, Socket } from 'socket.io-client';

enum WorkerStatus {
  Dead,
  Connected,
  Spamming,
}

export class Worker {
  status: WorkerStatus;
  client!: Socket;

  constructor() {
    this.status = WorkerStatus.Dead;
    this.client
  }

  connectTo(destination: string) {
    this.client = io(destination)
    this.client.on('connect', () => {
      this.status = WorkerStatus.Connected;
    })
  }
}
