// request {http.IncomingMessage}
// response {http.ServerResponse}
import { createServer, IncomingMessage, ServerResponse } from 'node:http';

const PORT = 4000;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  res.end('run');
});

server.listen(PORT, () => {
  console.log('server run');
});
