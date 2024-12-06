import knex from '../../database/config/database';

export class OrdersModel {
  static async createOrder(options: { email: string, product: string, quantity: number, price?: number, description?: string }) {
    const user = await knex('users').where({ email: options.email }).first();

    const order = await knex('orders').insert({
      user_id: user.id,
      product: options.product,
      quantity: options.quantity,
      price: options.price,
      description: options.description
    });

    return order;
  }

  static async searchOrder(options: { email: string }) {
    const user = await knex('users').where({ email: options.email }).first();

    const order = await knex('orders').where({ user_id: user.id });

    return order;
  }
}
