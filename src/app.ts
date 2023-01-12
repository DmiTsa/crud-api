import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import { buffer } from 'node:stream/consumers';

interface User {
  id?: string;
  username?: string;
  age?: number;
  hobbies?: string[];
}

const PORT = 4000;
const users: string[] = [
  { id: '001', username: 'user11', age: 30, hobbies: ['hobby1'] },
];
const baseUsersEndpoint = '/api/users';

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  switch (req.method) {
    //create getUsersController postUserController
    case 'GET':
      getUsersController(req, res, baseUsersEndpoint);
      break;
    case 'POST':
      postUsersController(req, res, baseUsersEndpoint);
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

function postUsersController(
  req: IncomingMessage,
  res: ServerResponse,
  baseEndpoint: string
) {
  let newUser: string;
  req.on('data', (chunk: string) => {
    newUser = chunk.toString();
    //validation
    users.push(newUser);
  });
  req.on('end', () => {
    res.end(JSON.stringify(users));
    return;
  });
}
// const postController = (req: IncomingMessage, res: ServerResponse) => {
//   switch (req.url) {
//     case `/api/users`:
//       let body: User;
//       req.on('data', (chunk: User) => {
//         body = chunk;
//       });
//       req.on('end', () => {
//         console.log(userValidator(body));

//         if (true) {
//           users.push(body);
//           res.statusCode = 201;
//           res.setHeader('Content-Type', 'application/json');
//           res.end(body);
//         } else {
//           res.statusCode = 400;
//           res.end('Invalid parameter(s)');
//         }
//       });
//       break;
//     default:
//       res.statusCode = 404;
//       res.write(`Error 404: Path: ${req.url} is not found`);
//       res.end();
//       break;
//   }
// };

// export default postController;

// //functions
// function userValidator(body: User): boolean {
//   return body.username && body.age && body.hobbies ? true : false;
// }
