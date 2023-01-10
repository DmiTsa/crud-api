import { createServer, IncomingMessage, ServerResponse } from 'node:http';

const PORT = 4000;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'GET') {
    if (req.url === '/api/users') {
      res.statusCode = 200;
      res.end('ok response');
    }
    // console.log(req.url);
  }
});

server.listen(PORT, () => {
  console.log('server run');
});

// const server = createServer(
//   (request: IncomingMessage, response: ServerResponse) => {
//     switch (request.method) {
//       case 'GET':
//         getController(request, response);
//         break;
//       case 'POST':
//         postController(request, response);
//         break;
//       default:
//         response.statusCode = 500;
//         response.write(
//           `Error 500: request type ${request.method} is not supported`
//         );
//         response.end();
//         break;
//     }
//   }
// );
