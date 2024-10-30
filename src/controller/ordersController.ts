import Axios from 'axios';
import { Request, Response } from 'express';

import { OrdersModel } from "../model/ordersModel";
import Env from "../utils/envVariables";

export class OrdersController {
  static async getUserEmail(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const getUser = await Axios.post(`${Env.getRileyEndpoint()}/users/search`, { email }, {
      headers: {
        'Authorization': `Bearer ${Env.getTokenJwt()}`,
      },
    });

    if (!getUser.data || getUser.data.length === 0) {
      throw new Error("User not found");
    }

    return response.status(200).json(getUser.data.email);
  }

  static async createOrder(request: Request, response: Response): Promise<Response> {
    const { email, product, quantity, price, description } = request.body

    const userData = await OrdersController.getUserEmail(request, response);

    if (!userData) {
      return response.status(400).json({ message: 'User not found' });
    }

    const order = await OrdersModel.createOrder({
      email,
      product,
      quantity,
      price,
      description
    });

    if (!order) {
      return response.status(400).json({ message: 'Order not created' });
    }

    return response
  }
}

