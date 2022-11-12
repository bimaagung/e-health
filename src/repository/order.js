const { Order } = require('../models');

class OrderRepository {
  constructor() {
    this._OrderModel = Order;
  }

  async createOrder(order) {
    const result = await this._OrderModel.create(order);
    return result;
  }

  async getOrderByUserId(userId) {
    const result = await this._OrderModel.findOne({
      where: { userId },
    });
    return result;
  }

  async getPendingOrderByUserId(userId) {
    const result = await this._OrderModel.findOne({
      where: {
        userId,
        status: 'PENDING',
      },
    });
    return result;
  }
}

module.exports = OrderRepository;
