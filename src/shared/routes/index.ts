import { Router } from 'express';
import UsersRoutes from '@modules/user/routes/user.routes';
import SessionsRoutes from '@modules/user/routes/sessions.routes';

const routes = Router();
routes.use('/users', UsersRoutes);
routes.use('/sessions', SessionsRoutes);

export default routes;
