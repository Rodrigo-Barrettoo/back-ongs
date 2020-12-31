import authenticatedRoutes from '@shared/middlewares/authenticatedRoutes';
import { Router } from 'express';
import UserController from '../controller/UserController';

const routes = Router();

routes.post('/', UserController.create);

routes.use(authenticatedRoutes);

routes.get('/', UserController.index);
routes.put('/:idUser', UserController.update);

export default routes;
