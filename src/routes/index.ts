import { Router } from 'express';
import UserRoutes from './user.routes';

const routes = Router();
routes.use('/users', UserRoutes);

export default routes;
