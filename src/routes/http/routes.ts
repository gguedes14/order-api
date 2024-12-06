import { Router } from 'express';
import ordersRoute from '../routes/ordersRoute';

const routes = Router();

routes.use('/order', ordersRoute);

export default routes;
