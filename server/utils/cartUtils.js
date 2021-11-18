module.exports = {
  calTotalPrice: (listItems, discountValue, shippingPrice) => {
    let totalPrice = 0;
    for (const item of listItems) {
      totalPrice +=
        item.product.prodPrice *
        item.quantity *
        (1 - parseFloat(item.product.prodDiscount?.discountPercent / 100 || 0));
    }
    totalPrice = totalPrice * (1 - discountValue / 100);
    return totalPrice + shippingPrice;
  },
  calSubTotal: (listItems) => {
    return listItems.reduce(
      (sum, current) => sum + current.quantity * current.product.prodPrice,
      0
    );
  },
};
