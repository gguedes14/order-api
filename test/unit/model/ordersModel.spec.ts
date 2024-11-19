import { OrdersModel } from '../../../src/model/ordersModel';
import knex from '../../../database/config/database';

jest.mock('../../../database/config/database', () => {
  return jest.fn().mockReturnValue({
    where: jest.fn().mockReturnThis() || jest.fn().mockRejectedValue(new Error('User not found')),
    first: jest.fn().mockResolvedValue({ id: 1 }),
    insert: jest.fn().mockResolvedValue([{ id: 1, user_id: 1, product: 'test_product', quantity: 1, price: 1, description: 'test_description' }]),
  });
});

describe('OrdersModel', () => {
  afterEach(() => {
    jest.clearAllMocks();  // Limpa os mocks após cada teste
  });

  test('createOrder with success', async () => {
    const order = {
      email: 'test@email.com',
      product: 'test_product',
      quantity: 1,
      price: 1,
      description: 'test_description',
    };

    const result = await OrdersModel.createOrder(order);

    expect(knex).toHaveBeenCalledWith('users');

    expect(knex().where).toHaveBeenCalledWith({ email: order.email });

    expect(knex().insert).toHaveBeenCalledWith({
      user_id: 1,
      product: order.product,
      quantity: order.quantity,
      price: order.price,
      description: order.description,
    });

    expect(result).toEqual([{ id: 1, user_id: 1, product: 'test_product', quantity: 1, price: 1, description: 'test_description' }]); // Verifica o retorno simulado
  });
});
