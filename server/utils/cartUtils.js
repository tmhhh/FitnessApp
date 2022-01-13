module.exports = {
  calTotalPrice: (listItems, discountValue, shippingPrice) => {
    let totalPrice = 0;
    for (const item of listItems) {
      if (item.isSelected && !item.isOrdered)
        totalPrice +=
          item.product.prodPrice *
          item.quantity *
          (new Date(item.product.prodDiscount?.startDate).getTime() -
            new Date().getTime() <
          0
            ? 1 - (item.product.prodDiscount?.discountPercent || 0) / 100
            : 1);
    }

    return totalPrice * (1 - discountValue / 100) + shippingPrice;
  },
  calSubTotal: (listItems) => {
    return listItems.reduce((sum, current) => {
      if (current.isSelected && !current.isOrdered)
        return (
          sum +
          current.quantity *
            current.product.prodPrice *
            (new Date(current.product.prodDiscount?.startDate).getTime() -
              new Date().getTime() <
            0
              ? 1 - (current.product.prodDiscount?.discountPercent || 0) / 100
              : 1)
        );
      return sum;
    }, 0);
  },
};
