import express from 'express';
import { BookRouters } from '../modules/books/books.route';
import { userRouters } from '../modules/users/users.route';

const routes = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRouters,
  },
  {
    path: '/books',
    route: BookRouters,
  },
];

moduleRoutes.forEach(route => routes.use(route.path, route.route));
export default routes;
