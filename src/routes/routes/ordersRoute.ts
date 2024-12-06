import { Router } from 'express';
import { OrdersController } from '../../controller/ordersController';

const ordersRoute = Router();

ordersRoute.post('/createOrder', OrdersController.createOrder);

ordersRoute.post('/searchOrder', OrdersController.searchOrder);

export default ordersRoute;
