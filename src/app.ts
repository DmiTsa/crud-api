import { createServer, IncomingMessage, ServerResponse } from 'node:http';

const PORT = 4000;
const users = [{ id: '001', username: 'user11', age: 30, hobbies: ['hobby1'] }];
const baseUsersEndpoint = '/api/users';

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  switch (req.method) {
    //create getUsersController postUserController
    case 'GET':
      getUsersController(req, res, baseUsersEndpoint);
      break;
    default:
      res.statusCode = 500;
      res.write(`Error 500: request type ${req.method} is not supported`);
      res.end();
      break;
  }
});

server.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

//functions
function getUsersController(
  req: IncomingMessage,
  res: ServerResponse,
  baseEndpoint: string
) {
  if (req.url === baseEndpoint) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(users));
    return;
  }
  const userId = req.url?.slice(baseEndpoint.length + 1);
  // console.log(userId);
}

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

// import { IncomingMessage, ServerResponse } from 'http';
// import users from '../data/users';

// const getController = (req: IncomingMessage, res: ServerResponse) => {
//   switch (req.url) {
//     case `/api/users`:
//       res.statusCode = 200;
//       res.setHeader('Content-Type', 'application/json');
//       res.end(JSON.stringify(users));
//       break;
//     default:
//       res.statusCode = 404;
//       res.write(`Error 404: Path: ${req.url} is not found`);
//       res.end();
//       break;
//   }
// };
// export default getController;
