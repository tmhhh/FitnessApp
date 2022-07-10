export const cartTotalPrice = (cart, userDiscount = 0) => {
  let totalPrice = 0;
  if (cart.length > 0) {
    cart.forEach((e) => {
      if (e.isSelected && !e.isOrdered)
        totalPrice +=
          e.product.prodPrice *
          e.quantity *
          (new Date(e.product.prodDiscount?.startDate).getTime() -
            new Date().getTime() <
          0
            ? 1 - (e.product.prodDiscount?.discountPercent || 0) / 100
            : 1);
    });
  }
  return totalPrice * (1 - userDiscount / 100);
};
export const calculateFinalPrice = (product) => {
  return (
    product.prodPrice *
    (new Date(product.prodDiscount?.startDate).getTime() -
      new Date().getTime() <
    0
      ? 1 - (product.prodDiscount?.discountPercent || 0) / 100
      : 1)
  );
};
export const calculatePercentage = (total, number) => {
  return Math.trunc((number / total) * 100);
};

export const calculateTotalCaloriesNeeded = (
  gender,
  age,
  height,
  weight,
  activityLevel,
  goal
) =>
  Math.trunc(
    (10 * weight + 6.25 * height - 5 * age + (gender === 0 ? 5 : -161)) *
      parseFloat(activityLevel) +
      (goal === 0 ? -150 : goal === 1 ? 0 : +150)
  );
export const calculateFoodTotalKCAL = (listFoods = []) => {
  return Math.trunc(
    listFoods.reduce((sum, current) => {
      return sum + current.foodKCAL * current.foodServing;
    }, 0)
  );
};
