# WebSocket - Proof of Concept

A websocket hello-world app using [Socket.io](https://socket.io/).
Express serves whatever files are in `/public` from the root URL (so don't create a file called `socket.io`!).

The app is an anonymous chat log with no backlog and no user identification (even by client).

## How to launch

```bash
$ pnpm install
$ pnpm start
```
