import { Router } from 'express';
import ordersRoute from '../routes/ordersRoute';

const routes = Router();

routes.use('/createOrders', ordersRoute);

export default routes;
