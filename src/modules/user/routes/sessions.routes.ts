import { Router } from 'express';
import SessionController from '../controller/SessionController';

const routes = Router();

routes.post('/', SessionController.create);

export default routes;
