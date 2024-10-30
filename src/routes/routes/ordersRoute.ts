import { Router } from 'express';
import { OrdersController } from '../../controller/ordersController';

const ordersRoute = Router();

ordersRoute.post('/', OrdersController.createOrder);

export default ordersRoute;
