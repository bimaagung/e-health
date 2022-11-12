const { OrderDetail } = require('../models');

class OrderRepository {
  constructor() {
    this._OrderDetailModel = OrderDetail;
  }

  async createOrderDetail(order) {
    const result = await this._OrderDetailModel.create(order);
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
}

module.exports = OrderRepository;
