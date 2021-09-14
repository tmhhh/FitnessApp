export const cartTotalPrice = (cart) => {
  let totalPrice = 0;
  // console.log(cart.length);
  if (cart.length > 0) {
    cart.forEach((e) => {
      totalPrice += e.product.prodPrice * e.quantity;
    });
  }

  return totalPrice;
};
