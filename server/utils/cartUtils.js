module.exports = {
  calTotalPrice: (listItems, discountValue, shippingPrice) => {
    let totalPrice = 0;
    for (const item of listItems) {
      totalPrice += item.product.prodPrice * item.quantity;
    }
    totalPrice = totalPrice * (1 - discountValue / 100);
    return totalPrice - shippingPrice;
  },
};