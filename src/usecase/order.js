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
    // check user punya order dengan STATUS PENDING

    let order = await this._orderRepository.getPendingOrderByUserId(userId);

    // Jika User tidak punya Order degan STATUS PENDING, maka user dibuatkan order dengan nilai status = PENDING

    if (order === null) {
      const orderValue = {
        userId,
        status: this._orderStatus.PENDING,
      };
      order = await this._orderRepository.createOrder(orderValue);
    }

    // input Detail Order atau hapus Detail Order

    await this.addOrDeleteOrderDetails(order.id, items);

    // Ambil hasil values akhir di setelah menjalankan fungsi addOrDeleteOrderDetails
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

  async addOrDeleteOrderDetails(orderId, items) {
    for (let i = 0; i < items.length; i += 1) {
      if (items[i].qty < 0) {
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
        // ambil order detail berdasakan parameter orderId dan product ID
        if (qty === 0) {
          if (verifyOrderDetail !== null) {
            // check jika Input Body Qty == 0, Maka orderDetail Akan di hapus.
            await this._orderDetailRepository.deleteOrderDetail(verifyOrderDetail.id);
            return;
          }
          // check jika Input Body Qty != 0 , Maka value orderDetail akan di kembalikan.
          return;
        }
        if (verifyOrderDetail !== null) {
          const updateOrderDetailValue = {
            qty,
            totalPrice: price * qty,
          };
          await this._orderDetailRepository.updateOrderDetail(updateOrderDetailValue, verifyOrderDetail.id);
        // jika input body product ID exist di order Detail, maka orderDetail akan di Update.
        } else {
          await this._orderDetailRepository.createOrderDetail(orderDetailValue);
          // jika input body product ID tidak exist di order Detail, maka akan membuat OrderDetail baru.
        }
      }
    }
  }

  async sumbitedOrder(orderId) {
    let result = {
      isSuccess: false,
      statusCode: 404,
      reason: null,
    };
    const order = await this._orderRepository.getPendingOrderByUserId(orderId);
    if (order === null) {
      result.reason = 'order not found';
      return result;
    }
    const sumbitedValues = {
      status: this._orderStatus.SUMBITED,
    };
    await this.updateStock(order.id, sumbitedValues.status);
    await this._orderRepository.updateOrder(sumbitedValues, order.id);
    result.isSuccess = true;
    result.status = 200;
    return result;
  }

  async processOrder(orderId) {
    let result = {
      isSuccess: false,
      statusCode: 404,
      reason: null,
    };
    const order = await this._orderRepository.getOrderById(orderId);
    const statusValues = ['PROCCESS', 'COMPLETED', 'PENDING', 'CANCELED'];
    for (let i = 0; i < statusValues.length; i += 1) {
      if (order.status === statusValues[i]) {
        result.statusCode = 400;
        result.reason = `cannot cancel order, status order ${statusValues[i]}`;
        return result;
      }
    }
    const statusValue = {
      status: this._orderStatus.PROCESS,
    };
    await this.updateStock(order.id, statusValue);
    await this._orderRepository.updateOrder(statusValue, order.id);
    result.isSuccess = true;
    result.status = 200;
    return result;
  }

  async canceledOrderByUser(userId, id) {
    let result = {
      isSuccess: false,
      statusCode: 404,
      reason: null,
    };
    const order = await this._orderRepository.getOrderById(id);
    if (userId !== order.userId) {
      result.reason = 'Order not found!';
      return result;
    }
    const statusValues = ['PENDING', 'COMPLETED', 'PROCESS', 'CANCELED'];
    for (let i = 0; i < statusValues.length; i += 1) {
      if (order.status === statusValues[i]) {
        result.statusCode = 400;
        result.reason = `cannot cancel order, status order ${statusValues[i]}`;
        return result;
      }
    }
    const statusVal = {
      status: this._orderStatus.CANCELED,
    };
    await this.updateStock(order.id, statusVal.status);
    await this._orderRepository.updateOrder(statusVal, order.id);
    result.isSuccess = true;
    result.status = 200;
    return result;
  }

  async canceledOrderByAdmin(orderId) {
    let result = {
      isSuccess: false,
      statusCode: 404,
      reason: null,
    };
    const order = await this._orderRepository.getOrderById(orderId);
    if (order === null) {
      result.reason = 'Order not found!';
      return result;
    }
    const statusValues = ['PENDING', 'COMPLETED', 'SUMBITED', 'CANCELED'];
    for (let i = 0; i < statusValues.length; i += 1) {
      if (order.status === statusValues[i]) {
        result.statusCode = 400;
        result.reason = `cannot cancel order, status order ${statusValues[i]}`;
        return result;
      }
    }
    const statusVal = {
      status: this._orderStatus.CANCELED,
    };
    await this.updateStock(order.id, statusVal.status);
    await this._orderRepository.updateOrder(statusVal, order.id);
    result.isSuccess = true;
    result.status = 200;
    return result;
  }

  async completedOrder(orderId) {
    let result = {
      isSuccess: false,
      statusCode: 404,
      reason: null,
    };
    const order = await this._orderRepository.getOrderById(orderId);
    if (order === null) {
      result.reason = 'order not found';
      return result;
    }
    const statusValues = ['PENDING', 'COMPLETED', 'SUMBITED', 'CANCELED'];
    for (let i = 0; i < statusValues.length; i += 1) {
      if (order.status === statusValues[i]) {
        result.statusCode = 400;
        result.reason = `cannot cancel order, status order ${statusValues[i]}`;
        return result;
      }
    }
    const statusValue = {
      status: this._orderStatus.COMPLETED,
      completeDate: new Date(),
    };
    await this._orderRepository.updateOrder(statusValue, orderId);
    result.isSuccess = true;
    result.status = 200;
    return result;
  }

  async updateStock(orderId, status) {
    const order = await this._orderDetailRepository.getOrderDetailByOrderId(orderId);
    for (let i = 0; i < order.length; i += 1) {
      let product = await this._productRepository.getProductById(order[i].productId);
      if (status === this._orderStatus.SUMBITED) {
        const sumbitedUpdateValue = {
          stock: product.stock - order[i].qty,
        };
        await this._productRepository.updateProduct(sumbitedUpdateValue, product.id);
      } else if (status === this._orderStatus.CANCELED) {
        const canceleUpdateValue = {
          stock: product.stock + order[i].qty,
        };
        await this._productRepository.updateProduct(canceleUpdateValue, product.id);
      }
    }
  }
}

module.exports = OrderUseCase;
