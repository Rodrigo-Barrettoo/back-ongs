import { Router } from 'express';
import UserController from '../controller/UserController';

const routes = Router();

routes.post('/', UserController.create);

export default routes;
