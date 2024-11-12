import axios from 'axios';
import { Request, Response } from 'express';

import { OrdersController } from '../../../src/controller/ordersController';
import Env from '../../../src/utils/envVariables';
import { OrdersModel } from '../../../src/model/ordersModel';

describe('OrdersController', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('getUserEmail with successfully', async () => {
    jest.spyOn(Env, 'getTokenJwt').mockReturnValue('test_token');

    jest.spyOn(Env, 'getRileyEndpoint').mockReturnValue('test_endpoint');

    jest.spyOn(axios, 'post').mockResolvedValue({
      data: {
        email: 'test@email.com',
      }
    })

    const request = {
      body: {
        email: 'test@email.com',
      },
    } as unknown as Request;

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await OrdersController.getUserEmail(request, response);

    expect(Env.getTokenJwt).toHaveBeenCalled();
    expect(Env.getRileyEndpoint).toHaveBeenCalled();

    expect(axios.post).toHaveBeenCalledWith(
      'test_endpoint/users/search',
      { email: 'test@email.com' },
      {
        headers: {
          'Authorization': `Bearer test_token`,
        },
      }
    );

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith('test@email.com');
  });

  test('getUserEmail user not found', async () => {
    jest.spyOn(Env, 'getTokenJwt').mockReturnValue('test_token');

    jest.spyOn(Env, 'getRileyEndpoint').mockReturnValue('test_endpoint');

    jest.spyOn(axios, 'post').mockResolvedValue({
      data: []
    })

    const request = {
      body: {
        email: 'test@email.com',
      },
    } as unknown as Request;

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await OrdersController.getUserEmail(request, response);

    expect(Env.getTokenJwt).toHaveBeenCalled();
    expect(Env.getRileyEndpoint).toHaveBeenCalled();

    expect(axios.post).toHaveBeenCalledWith(
      'test_endpoint/users/search',
      { email: 'test@email.com' },
      {
        headers: {
          'Authorization': `Bearer test_token`,
        },
      }
    );

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({ message: 'User not found' });
  });

  test('createOrder with successfully', async () => {  
    const request = {
      body: {
        email: 'test@email.com',
        product: 'test_product',
        quantity: 1,
        price: 1,
        description: 'test_description',
      },
    } as unknown as Request;

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    jest.spyOn(OrdersController, 'getUserEmail').mockResolvedValue(request.body.email);

    jest.spyOn(OrdersModel, 'createOrder').mockResolvedValue(request.body);

    await OrdersController.createOrder(request, response);

    expect(OrdersModel.createOrder).toHaveBeenCalledWith({
      email: 'test@email.com',
      product: 'test_product',
      quantity: 1,
      price: 1,
      description: 'test_description',
    });

    expect(OrdersController.getUserEmail).toHaveBeenCalledWith(request, response);

    expect(OrdersModel.createOrder).toHaveBeenCalledTimes(1);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({ message: 'Order created' });
  });

  test('createOrder user not found', async () => {
    const request = {
      body: {
        email: '',
        product: 'test_product',
        quantity: 1,
        price: 1,
        description: 'test_description',
      },
    } as unknown as Request;

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    jest.spyOn(OrdersController, 'getUserEmail').mockResolvedValue(request.body.email);

    await OrdersController.createOrder(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({ message: 'User not found' });
  });
});
