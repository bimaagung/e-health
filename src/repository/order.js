const { Order } = require('../models');

class OrderRepository {
  constructor() {
    this._OrderModel = Order;
  }

  async createOrder(order) {
    const result = await this._OrderModel.create(order);
    return result;
  }

  async getAllOrderByUserId(userId) {
    const result = await this._OrderModel.findAll({
      where: { userId },
    });
    return result;
  }

  async getOrderById(id) {
    const result = await this._OrderModel.findOne({
      where: { id },
    });
    return result;
  }

  async updateOrder(order, id) {
    const result = await this._OrderModel.update(order, {
      where: { id },
    });
    return result;
  }

  async deleteOrder(id) {
    const result = await this._OrderModel.destroy({
      where: { id },
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
