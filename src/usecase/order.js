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
}

module.exports = OrderUseCase;
