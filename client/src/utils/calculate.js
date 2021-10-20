export const cartTotalPrice = (cart, discount = 0) => {
  let totalPrice = 0;
  if (cart.length > 0) {
    cart.forEach((e) => {
      if (e.isSelected && !e.isOrdered)
        totalPrice += e.product.prodPrice * e.quantity;
    });
  }
  console.log(discount, totalPrice, totalPrice * (1 - discount / 100));
  return totalPrice * (1 - discount / 100);
};

export const calculatePercentage = (total, number) => {
  return Math.trunc((number / total) * 100);
};
