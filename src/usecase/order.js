class OrderUseCase {
  constructor(orderRepository, orderDetailRepository, userRepository, productRepository, orderStatus, has) {
    this._orderRepository = orderRepository;
    this._orderDetailRepository = orderDetailRepository;
    this._userRepository = userRepository;
    this._productRepository = productRepository;
    this._orderStatus = orderStatus;
    this._has = has;
  }

  async createOrUpdateOrder(userId, items) {
    let result = {
      isSuccess: true,
      statusCode: 200,
      reason: null,
      data: null,
    };
    let order = await this._orderRepository.getPendingOrderByUserId(userId);
    if (order === null) {
      const orderValue = {
        userId,
        status: this._orderStatus.PENDING,
      };
      order = await this._orderRepository.createOrder(orderValue);
    }
    await this.addOrderDetails(order.id, items);
    const newOrder = await this._orderRepository.getPendingOrderByUserId(userId);
    const orderDetail = await this._orderDetailRepository.getOrderDetailByOrderId(newOrder.dataValues.id);
    const orderValue = {
      id: newOrder.id,
      userId: newOrder.userId,
      status: newOrder.status,
      totalQty: await this._has._.sumBy(orderDetail, 'qty'),
      totalItemType: orderDetail.length,
      grandTotal: await this._has._.sumBy(orderDetail, 'totalPrice'),
      completeDate: newOrder.completeDate,
      createdAt: newOrder.createdAt,
      updateAt: newOrder.updateAt,
      orderDetail,
    };

    result.isSuccess = true;
    result.data = orderValue;
    return result;
  }

  async addOrderDetails(orderId, items) {
    for (let i = 0; i < items.length; i += 1) {
      if (items[i].qty <= 0) {
        continue;
      }
      let product = await this._productRepository.getProductById(items[i].id);
      if (product !== null) {
        let qty = items[i].qty;
        let price = product.price;
        let totalPrice = price * qty;
        let orderDetailValue = {
          orderId,
          productId: product.id,
          qty,
          price,
          totalPrice,
        };

        const verifyOrderDetail = await this._orderDetailRepository.getOrderByOrderIdAndProductId(orderId, product.id);
        if (verifyOrderDetail !== null) {
          const updateOrderDetailValue = {
            qty: verifyOrderDetail.qty + qty,
            totalPrice: price * verifyOrderDetail.qty,
          };

          await this._orderDetailRepository.updateOrderDetail(orderId, updateOrderDetailValue);
        } else {
          await this._orderDetailRepository.createOrderDetail(orderDetailValue);
        }
      }
    }
  }
}

module.exports = OrderUseCase;
