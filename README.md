# WebSocket - Proof of Concept

A websocket hello-world app using [Socket.io](https://socket.io/).
Express serves whatever files are in `/public` from the root URL (so don't create a file called `socket.io`!).

The app is an anonymous chat log with no backlog and no user identification (even by client).

## How to launch

```bash
$ pnpm install
$ pnpm start
```

With the server running, you can use another terminal to launch the **benchmark**,
which will make `N_CONNECTIONS` to the server, and then it will spam it with random `message` events.
You can also set which server/port to connect to via environment variables:

```bash
$ # SRV_HOST=testServer.local   # change target host
$ # SRV_PORT=9002               # change target port
$ pnpm bench
```

Can you make a DDoS attack out of this?
Probably not, you'll get rate limited and ip-banned by the time your 80th connection hits lol
