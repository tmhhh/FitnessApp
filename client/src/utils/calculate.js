export const cartTotalPrice = (cart, userDiscount = 0) => {
  let totalPrice = 0;
  if (cart.length > 0) {
    cart.forEach((e) => {
      if (e.isSelected && !e.isOrdered)
        totalPrice +=
          e.product.prodPrice *
          e.quantity *
          (1 - parseFloat(e.product.prodDiscount?.discountPercent || 0) / 100);
    });
  }
  return totalPrice * (1 - userDiscount / 100);
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

export const calculateFoodTotalKCAL = (addedDate, listFoods) => {
  if (addedDate !== new Date().toLocaleDateString()) {
    return 0;
  }
  return Math.trunc(
    listFoods.reduce((sum, current) => {
      return sum + current.foodKCAL * current.foodServing;
    }, 0)
  );
};
