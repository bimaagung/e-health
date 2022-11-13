const { OrderDetail } = require('../models');

class OrderRepository {
  constructor() {
    this._OrderDetailModel = OrderDetail;
  }

  async createOrderDetail(order) {
    const result = await this._OrderDetailModel.create(order);
    return result;
  }

  async updateOrderDetail(order, id) {
    const result = await this._OrderDetailModel.update(order, { where: { id } });
    return result;
  }

  async deleteOrderDetail(id) {
    const result = await this._OrderDetailModel.destroy({ where: { id } });
    return result;
  }

  async getOrderByOrderIdAndProductId(orderId, productId) {
    const result = await this._OrderDetailModel.findOne({
      where: {
        orderId,
        productId,
      },
    });
    return result;
  }

  async getOrderDetailByOrderId(orderId) {
    const result = await this._OrderDetailModel.findAll({
      where: {
        orderId,
      },
    });
    return result;
  }
}

module.exports = OrderRepository;
