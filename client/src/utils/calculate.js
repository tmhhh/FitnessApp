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
      (goal === 0 ? -500 : goal === 1 ? 0 : +500)
  );
export const calculateFoodTotalKCAL = (listFoods = []) => {
  return Math.trunc(
    listFoods.reduce((sum, current) => {
      return sum + current.foodKCAL * current.foodServing;
    }, 0)
  );
};

export const convertDataToHealthData = ({ gender, age, averageUserData }) => {
  let healthData = null;
  if (gender === 0) {
    console.log(1);
    //MEN
    switch (true) {
      case age >= 18 && age <= 20:
        switch (true) {
          case averageUserData <= 2:
            healthData = {
              bodyFat: "2-3",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 2 && averageUserData <= 3.9:
            console.log(2);
            healthData = {
              bodyFat: "4-5",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 3.9 && averageUserData <= 6.2:
            healthData = {
              bodyFat: "6-7",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 6.2 && averageUserData <= 8.5:
            healthData = {
              bodyFat: "8-9",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 8.5 && averageUserData <= 10.5:
            healthData = {
              bodyFat: "10-11",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 10.5 && averageUserData <= 12.5:
            healthData = {
              bodyFat: "12-13",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 12.5 && averageUserData <= 14.3:
            healthData = {
              bodyFat: "14-15",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 14.3 && averageUserData <= 16:
            healthData = {
              bodyFat: "16-17",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 16 && averageUserData <= 17.5:
            healthData = {
              bodyFat: "18-19",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 17.5 && averageUserData <= 18.9:
            healthData = {
              bodyFat: "20-21",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 18.9 && averageUserData <= 20.2:
            healthData = {
              bodyFat: "22-23",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 20.2 && averageUserData <= 21.3:
            healthData = {
              bodyFat: "24-25",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 21.3 && averageUserData <= 22.3:
            healthData = {
              bodyFat: "26-27",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 22.3 && averageUserData <= 23.1:
            healthData = {
              bodyFat: "28-29",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 23.1 && averageUserData <= 23.8:
            healthData = {
              bodyFat: "30-31",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 23.8 && averageUserData <= 24.3:
            healthData = {
              bodyFat: "32-33",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 24.3 && averageUserData <= 24.9:
            healthData = {
              bodyFat: "34-36",
              status: "Above Average",
              statusType: 3,
            };
            break;

          default:
            break;
        }
        break;
      case age >= 21 && age <= 25:
        switch (true) {
          case averageUserData <= 2.5:
            healthData = {
              bodyFat: "2-3",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 2.5 && averageUserData <= 4.9:
            healthData = {
              bodyFat: "4-5",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 4.9 && averageUserData <= 7.3:
            healthData = {
              bodyFat: "6-7",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 7.3 && averageUserData <= 9.5:
            healthData = {
              bodyFat: "8-9",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 9.5 && averageUserData <= 11.6:
            healthData = {
              bodyFat: "10-11",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 11.6 && averageUserData <= 13.6:
            healthData = {
              bodyFat: "12-13",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 13.6 && averageUserData <= 15.4:
            healthData = {
              bodyFat: "14-15",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 15.4 && averageUserData <= 17:
            healthData = {
              bodyFat: "16-17",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 17 && averageUserData <= 18.6:
            healthData = {
              bodyFat: "18-19",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 18.6 && averageUserData <= 20:
            healthData = {
              bodyFat: "20-21",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 20 && averageUserData <= 21.2:
            healthData = {
              bodyFat: "22-23",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 21.2 && averageUserData <= 22.3:
            healthData = {
              bodyFat: "24-25",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 22.3 && averageUserData <= 23.3:
            healthData = {
              bodyFat: "26-27",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 23.3 && averageUserData <= 24.2:
            healthData = {
              bodyFat: "28-29",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 24.2 && averageUserData <= 24.9:
            healthData = {
              bodyFat: "30-31",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 24.9 && averageUserData <= 25.4:
            healthData = {
              bodyFat: "32-33",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 25.4 && averageUserData <= 25.8:
            healthData = {
              bodyFat: "34-36",
              status: "Above Average",
              statusType: 3,
            };
            break;

          default:
            break;
        }

        break;
      case age >= 26 && age <= 30:
        switch (true) {
          case averageUserData <= 3.5:
            healthData = {
              bodyFat: "2-3",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 3.5 && averageUserData <= 6:
            healthData = {
              bodyFat: "4-5",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 6 && averageUserData <= 8.4:
            healthData = {
              bodyFat: "6-7",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 8.4 && averageUserData <= 10.6:
            healthData = {
              bodyFat: "8-9",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 10.6 && averageUserData <= 12.7:
            healthData = {
              bodyFat: "10-11",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 12.7 && averageUserData <= 14.6:
            healthData = {
              bodyFat: "12-13",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 14.6 && averageUserData <= 16.4:
            healthData = {
              bodyFat: "14-15",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 16.4 && averageUserData <= 18.1:
            healthData = {
              bodyFat: "16-17",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 18.1 && averageUserData <= 19.6:
            healthData = {
              bodyFat: "18-19",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 19.6 && averageUserData <= 21:
            healthData = {
              bodyFat: "20-21",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 21 && averageUserData <= 22.3:
            healthData = {
              bodyFat: "22-23",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 22.3 && averageUserData <= 23.4:
            healthData = {
              bodyFat: "24-25",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 23.4 && averageUserData <= 24.4:
            healthData = {
              bodyFat: "26-27",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 24.4 && averageUserData <= 25.2:
            healthData = {
              bodyFat: "28-29",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 25.2 && averageUserData <= 25.9:
            healthData = {
              bodyFat: "30-31",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 25.9 && averageUserData <= 26.5:
            healthData = {
              bodyFat: "32-33",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 26.5 && averageUserData <= 26.9:
            healthData = {
              bodyFat: "34-36",
              status: "Above Average",
              statusType: 3,
            };
            break;

          default:
            break;
        }
        break;
      case age >= 31 && age <= 35:
        switch (true) {
          case averageUserData <= 4.5:
            healthData = {
              bodyFat: "2-3",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 4.5 && averageUserData <= 7.1:
            healthData = {
              bodyFat: "4-5",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 7.1 && averageUserData <= 9.4:
            healthData = {
              bodyFat: "6-7",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 9.4 && averageUserData <= 11.7:
            healthData = {
              bodyFat: "8-9",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 11.7 && averageUserData <= 13.7:
            healthData = {
              bodyFat: "10-11",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 13.7 && averageUserData <= 15.7:
            healthData = {
              bodyFat: "12-13",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 15.7 && averageUserData <= 17.5:
            healthData = {
              bodyFat: "14-15",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 17.5 && averageUserData <= 19.2:
            healthData = {
              bodyFat: "16-17",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 19.2 && averageUserData <= 20.7:
            healthData = {
              bodyFat: "18-19",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 20.7 && averageUserData <= 22.1:
            healthData = {
              bodyFat: "20-21",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 22.1 && averageUserData <= 23.4:
            healthData = {
              bodyFat: "22-23",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 23.4 && averageUserData <= 24.5:
            healthData = {
              bodyFat: "24-25",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 24.5 && averageUserData <= 25.5:
            healthData = {
              bodyFat: "26-27",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 25.5 && averageUserData <= 26.3:
            healthData = {
              bodyFat: "28-29",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 26.3 && averageUserData <= 27:
            healthData = {
              bodyFat: "30-31",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 27 && averageUserData <= 27.5:
            healthData = {
              bodyFat: "32-33",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 27.5 && averageUserData <= 28:
            healthData = {
              bodyFat: "34-36",
              status: "Above Average",
              statusType: 3,
            };
            break;

          default:
            break;
        }
        break;
      case age >= 36 && age <= 40:
        switch (true) {
          case averageUserData <= 5.6:
            healthData = {
              bodyFat: "2-3",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 5.6 && averageUserData <= 8.1:
            healthData = {
              bodyFat: "4-5",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 8.1 && averageUserData <= 10.5:
            healthData = {
              bodyFat: "6-7",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 10.5 && averageUserData <= 12.7:
            healthData = {
              bodyFat: "8-9",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 12.7 && averageUserData <= 14.8:
            healthData = {
              bodyFat: "10-11",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 14.8 && averageUserData <= 16.8:
            healthData = {
              bodyFat: "12-13",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 16.8 && averageUserData <= 18.6:
            healthData = {
              bodyFat: "14-15",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 18.6 && averageUserData <= 20.2:
            healthData = {
              bodyFat: "16-17",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 20.2 && averageUserData <= 21.8:
            healthData = {
              bodyFat: "18-19",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 21.8 && averageUserData <= 23.2:
            healthData = {
              bodyFat: "20-21",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 23.2 && averageUserData <= 24.4:
            healthData = {
              bodyFat: "22-23",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 24.4 && averageUserData <= 25.6:
            healthData = {
              bodyFat: "24-25",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 25.6 && averageUserData <= 26.5:
            healthData = {
              bodyFat: "26-27",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 26.5 && averageUserData <= 27.4:
            healthData = {
              bodyFat: "28-29",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 27.4 && averageUserData <= 28.1:
            healthData = {
              bodyFat: "30-31",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 28.1 && averageUserData <= 28.6:
            healthData = {
              bodyFat: "32-33",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 28.6 && averageUserData <= 29:
            healthData = {
              bodyFat: "34-36",
              status: "Above Average",
              statusType: 3,
            };
            break;

          default:
            break;
        }
        break;
      case age >= 41 && age <= 45:
        switch (true) {
          case averageUserData <= 6.7:
            healthData = {
              bodyFat: "2-3",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 6.7 && averageUserData <= 9.2:
            healthData = {
              bodyFat: "4-5",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 9.2 && averageUserData <= 11.5:
            healthData = {
              bodyFat: "6-7",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 11.5 && averageUserData <= 13.8:
            healthData = {
              bodyFat: "8-9",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 13.8 && averageUserData <= 15.9:
            healthData = {
              bodyFat: "10-11",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 15.9 && averageUserData <= 17.8:
            healthData = {
              bodyFat: "12-13",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 17.8 && averageUserData <= 19.6:
            healthData = {
              bodyFat: "14-15",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 19.6 && averageUserData <= 21.3:
            healthData = {
              bodyFat: "16-17",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 21.3 && averageUserData <= 22.8:
            healthData = {
              bodyFat: "18-19",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 22.8 && averageUserData <= 24.7:
            healthData = {
              bodyFat: "20-21",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 24.7 && averageUserData <= 25.5:
            healthData = {
              bodyFat: "22-23",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 25.5 && averageUserData <= 26.6:
            healthData = {
              bodyFat: "24-25",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 26.6 && averageUserData <= 27.6:
            healthData = {
              bodyFat: "26-27",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 27.6 && averageUserData <= 28.4:
            healthData = {
              bodyFat: "28-29",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 28.4 && averageUserData <= 29.1:
            healthData = {
              bodyFat: "30-31",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 29.1 && averageUserData <= 29.7:
            healthData = {
              bodyFat: "32-33",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 29.7 && averageUserData <= 30.1:
            healthData = {
              bodyFat: "34-36",
              status: "Above Average",
              statusType: 3,
            };
            break;

          default:
            break;
        }
        break;
      case age >= 46 && age <= 50:
        switch (true) {
          case averageUserData <= 7.7:
            healthData = {
              bodyFat: "2-3",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 7.7 && averageUserData <= 10.2:
            healthData = {
              bodyFat: "4-5",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 10.2 && averageUserData <= 12.6:
            healthData = {
              bodyFat: "6-7",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 12.6 && averageUserData <= 14.8:
            healthData = {
              bodyFat: "8-9",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 14.8 && averageUserData <= 16.9:
            healthData = {
              bodyFat: "10-11",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 16.9 && averageUserData <= 18.9:
            healthData = {
              bodyFat: "12-13",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 18.9 && averageUserData <= 20.7:
            healthData = {
              bodyFat: "14-15",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 20.7 && averageUserData <= 22.4:
            healthData = {
              bodyFat: "16-17",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 22.4 && averageUserData <= 23.9:
            healthData = {
              bodyFat: "18-19",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 23.9 && averageUserData <= 25.3:
            healthData = {
              bodyFat: "20-21",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 25.3 && averageUserData <= 26.6:
            healthData = {
              bodyFat: "22-23",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 26.6 && averageUserData <= 27.7:
            healthData = {
              bodyFat: "24-25",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 27.7 && averageUserData <= 28.7:
            healthData = {
              bodyFat: "26-27",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 28.7 && averageUserData <= 29.5:
            healthData = {
              bodyFat: "28-29",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 29.5 && averageUserData <= 30.2:
            healthData = {
              bodyFat: "30-31",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 30.2 && averageUserData <= 30.7:
            healthData = {
              bodyFat: "32-33",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 30.7 && averageUserData <= 31.2:
            healthData = {
              bodyFat: "34-36",
              status: "Above Average",
              statusType: 3,
            };
            break;

          default:
            break;
        }
        break;
      case age >= 51 && age <= 55:
        switch (true) {
          case averageUserData <= 8.8:
            healthData = {
              bodyFat: "2-3",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 8.8 && averageUserData <= 11.3:
            healthData = {
              bodyFat: "4-5",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 11.3 && averageUserData <= 13.7:
            healthData = {
              bodyFat: "6-7",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 13.7 && averageUserData <= 15.9:
            healthData = {
              bodyFat: "8-9",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 15.9 && averageUserData <= 18:
            healthData = {
              bodyFat: "10-11",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 18 && averageUserData <= 20:
            healthData = {
              bodyFat: "12-13",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 20 && averageUserData <= 21.8:
            healthData = {
              bodyFat: "14-15",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 21.8 && averageUserData <= 23.4:
            healthData = {
              bodyFat: "16-17",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 23.4 && averageUserData <= 25:
            healthData = {
              bodyFat: "18-19",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 25 && averageUserData <= 26.4:
            healthData = {
              bodyFat: "20-21",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 26.4 && averageUserData <= 27.6:
            healthData = {
              bodyFat: "22-23",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 27.6 && averageUserData <= 28.7:
            healthData = {
              bodyFat: "24-25",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 28.7 && averageUserData <= 29.7:
            healthData = {
              bodyFat: "26-27",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 29.7 && averageUserData <= 30.6:
            healthData = {
              bodyFat: "28-29",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 30.6 && averageUserData <= 31.2:
            healthData = {
              bodyFat: "30-31",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 31.2 && averageUserData <= 31.8:
            healthData = {
              bodyFat: "32-33",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 31.8 && averageUserData <= 32.2:
            healthData = {
              bodyFat: "34-36",
              status: "Above Average",
              statusType: 3,
            };
            break;
          default:
            break;
        }
        break;
      case age >= 56:
        switch (true) {
          case averageUserData <= 9.9:
            healthData = {
              bodyFat: "2-3",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 9.9 && averageUserData <= 12.4:
            healthData = {
              bodyFat: "4-5",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 12.4 && averageUserData <= 14.7:
            healthData = {
              bodyFat: "6-7",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 14.7 && averageUserData <= 17:
            healthData = {
              bodyFat: "8-9",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 17 && averageUserData <= 19.1:
            healthData = {
              bodyFat: "10-11",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 19.1 && averageUserData <= 21:
            healthData = {
              bodyFat: "12-13",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 21 && averageUserData <= 22.8:
            healthData = {
              bodyFat: "14-15",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 22.8 && averageUserData <= 24.5:
            healthData = {
              bodyFat: "16-17",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 24.5 && averageUserData <= 26:
            healthData = {
              bodyFat: "18-19",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 26 && averageUserData <= 27.4:
            healthData = {
              bodyFat: "20-21",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 27.4 && averageUserData <= 28.7:
            healthData = {
              bodyFat: "22-23",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 28.7 && averageUserData <= 29.8:
            healthData = {
              bodyFat: "24-25",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 29.8 && averageUserData <= 30.8:
            healthData = {
              bodyFat: "26-27",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 30.8 && averageUserData <= 31.6:
            healthData = {
              bodyFat: "28-29",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 31.6 && averageUserData <= 32.3:
            healthData = {
              bodyFat: "30-31",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 32.3 && averageUserData <= 32.9:
            healthData = {
              bodyFat: "32-33",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 32.9 && averageUserData <= 33.3:
            healthData = {
              bodyFat: "34-36",
              status: "Above Average",
              statusType: 3,
            };
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  } else if (gender === 1) {
    switch (true) {
      case age >= 18 && age <= 20:
        switch (true) {
          case averageUserData <= 2:
            healthData = {
              bodyFat: "2-3",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 2 && averageUserData <= 3.9:
            healthData = {
              bodyFat: "4-5",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 3.9 && averageUserData <= 6.2:
            healthData = {
              bodyFat: "6-7",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 6.2 && averageUserData <= 8.5:
            healthData = {
              bodyFat: "8-9",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 8.5 && averageUserData <= 10.5:
            healthData = {
              bodyFat: "10-11",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 10.5 && averageUserData <= 12.5:
            healthData = {
              bodyFat: "12-13",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 12.5 && averageUserData <= 14.3:
            healthData = {
              bodyFat: "14-15",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 14.3 && averageUserData <= 16:
            healthData = {
              bodyFat: "16-17",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 16 && averageUserData <= 17.5:
            healthData = {
              bodyFat: "18-19",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 17.5 && averageUserData <= 18.9:
            healthData = {
              bodyFat: "20-21",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 18.9 && averageUserData <= 20.2:
            healthData = {
              bodyFat: "22-23",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 20.2 && averageUserData <= 21.3:
            healthData = {
              bodyFat: "24-25",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 21.3 && averageUserData <= 22.3:
            healthData = {
              bodyFat: "26-27",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 22.3 && averageUserData <= 23.1:
            healthData = {
              bodyFat: "28-29",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 23.1 && averageUserData <= 23.8:
            healthData = {
              bodyFat: "30-31",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 23.8 && averageUserData <= 24.3:
            healthData = {
              bodyFat: "32-33",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 24.3 && averageUserData <= 24.9:
            healthData = {
              bodyFat: "34-36",
              status: "Above Average",
              statusType: 3,
            };
            break;

          default:
            break;
        }
        break;
      case age >= 21 && age <= 25:
        switch (true) {
          case averageUserData <= 2.5:
            healthData = {
              bodyFat: "2-3",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 2.5 && averageUserData <= 4.9:
            healthData = {
              bodyFat: "4-5",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 4.9 && averageUserData <= 7.3:
            healthData = {
              bodyFat: "6-7",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 7.3 && averageUserData <= 9.5:
            healthData = {
              bodyFat: "8-9",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 9.5 && averageUserData <= 11.6:
            healthData = {
              bodyFat: "10-11",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 11.6 && averageUserData <= 13.6:
            healthData = {
              bodyFat: "12-13",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 13.6 && averageUserData <= 15.4:
            healthData = {
              bodyFat: "14-15",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 15.4 && averageUserData <= 17:
            healthData = {
              bodyFat: "16-17",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 17 && averageUserData <= 18.6:
            healthData = {
              bodyFat: "18-19",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 18.6 && averageUserData <= 20:
            healthData = {
              bodyFat: "20-21",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 20 && averageUserData <= 21.2:
            healthData = {
              bodyFat: "22-23",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 21.2 && averageUserData <= 22.3:
            healthData = {
              bodyFat: "24-25",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 22.3 && averageUserData <= 23.3:
            healthData = {
              bodyFat: "26-27",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 23.3 && averageUserData <= 24.2:
            healthData = {
              bodyFat: "28-29",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 24.2 && averageUserData <= 24.9:
            healthData = {
              bodyFat: "30-31",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 24.9 && averageUserData <= 25.4:
            healthData = {
              bodyFat: "32-33",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 25.4 && averageUserData <= 25.8:
            healthData = {
              bodyFat: "34-36",
              status: "Above Average",
              statusType: 3,
            };
            break;

          default:
            break;
        }

        break;
      case age >= 26 && age <= 30:
        switch (true) {
          case averageUserData <= 3.5:
            healthData = {
              bodyFat: "2-3",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 3.5 && averageUserData <= 6:
            healthData = {
              bodyFat: "4-5",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 6 && averageUserData <= 8.4:
            healthData = {
              bodyFat: "6-7",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 8.4 && averageUserData <= 10.6:
            healthData = {
              bodyFat: "8-9",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 10.6 && averageUserData <= 12.7:
            healthData = {
              bodyFat: "10-11",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 12.7 && averageUserData <= 14.6:
            healthData = {
              bodyFat: "12-13",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 14.6 && averageUserData <= 16.4:
            healthData = {
              bodyFat: "14-15",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 16.4 && averageUserData <= 18.1:
            healthData = {
              bodyFat: "16-17",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 18.1 && averageUserData <= 19.6:
            healthData = {
              bodyFat: "18-19",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 19.6 && averageUserData <= 21:
            healthData = {
              bodyFat: "20-21",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 21 && averageUserData <= 22.3:
            healthData = {
              bodyFat: "22-23",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 22.3 && averageUserData <= 23.4:
            healthData = {
              bodyFat: "24-25",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 23.4 && averageUserData <= 24.4:
            healthData = {
              bodyFat: "26-27",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 24.4 && averageUserData <= 25.2:
            healthData = {
              bodyFat: "28-29",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 25.2 && averageUserData <= 25.9:
            healthData = {
              bodyFat: "30-31",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 25.9 && averageUserData <= 26.5:
            healthData = {
              bodyFat: "32-33",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 26.5 && averageUserData <= 26.9:
            healthData = {
              bodyFat: "34-36",
              status: "Above Average",
              statusType: 3,
            };
            break;

          default:
            break;
        }
        break;
      case age >= 31 && age <= 35:
        switch (true) {
          case averageUserData <= 4.5:
            healthData = {
              bodyFat: "2-3",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 4.5 && averageUserData <= 7.1:
            healthData = {
              bodyFat: "4-5",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 7.1 && averageUserData <= 9.4:
            healthData = {
              bodyFat: "6-7",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 9.4 && averageUserData <= 11.7:
            healthData = {
              bodyFat: "8-9",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 11.7 && averageUserData <= 13.7:
            healthData = {
              bodyFat: "10-11",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 13.7 && averageUserData <= 15.7:
            healthData = {
              bodyFat: "12-13",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 15.7 && averageUserData <= 17.5:
            healthData = {
              bodyFat: "14-15",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 17.5 && averageUserData <= 19.2:
            healthData = {
              bodyFat: "16-17",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 19.2 && averageUserData <= 20.7:
            healthData = {
              bodyFat: "18-19",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 20.7 && averageUserData <= 22.1:
            healthData = {
              bodyFat: "20-21",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 22.1 && averageUserData <= 23.4:
            healthData = {
              bodyFat: "22-23",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 23.4 && averageUserData <= 24.5:
            healthData = {
              bodyFat: "24-25",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 24.5 && averageUserData <= 25.5:
            healthData = {
              bodyFat: "26-27",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 25.5 && averageUserData <= 26.3:
            healthData = {
              bodyFat: "28-29",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 26.3 && averageUserData <= 27:
            healthData = {
              bodyFat: "30-31",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 27 && averageUserData <= 27.5:
            healthData = {
              bodyFat: "32-33",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 27.5 && averageUserData <= 28:
            healthData = {
              bodyFat: "34-36",
              status: "Above Average",
              statusType: 3,
            };
            break;

          default:
            break;
        }
        break;
      case age >= 36 && age <= 40:
        switch (true) {
          case averageUserData <= 5.6:
            healthData = {
              bodyFat: "2-3",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 5.6 && averageUserData <= 8.1:
            healthData = {
              bodyFat: "4-5",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 8.1 && averageUserData <= 10.5:
            healthData = {
              bodyFat: "6-7",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 10.5 && averageUserData <= 12.7:
            healthData = {
              bodyFat: "8-9",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 12.7 && averageUserData <= 14.8:
            healthData = {
              bodyFat: "10-11",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 14.8 && averageUserData <= 16.8:
            healthData = {
              bodyFat: "12-13",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 16.8 && averageUserData <= 18.6:
            healthData = {
              bodyFat: "14-15",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 18.6 && averageUserData <= 20.2:
            healthData = {
              bodyFat: "16-17",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 20.2 && averageUserData <= 21.8:
            healthData = {
              bodyFat: "18-19",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 21.8 && averageUserData <= 23.2:
            healthData = {
              bodyFat: "20-21",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 23.2 && averageUserData <= 24.4:
            healthData = {
              bodyFat: "22-23",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 24.4 && averageUserData <= 25.6:
            healthData = {
              bodyFat: "24-25",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 25.6 && averageUserData <= 26.5:
            healthData = {
              bodyFat: "26-27",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 26.5 && averageUserData <= 27.4:
            healthData = {
              bodyFat: "28-29",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 27.4 && averageUserData <= 28.1:
            healthData = {
              bodyFat: "30-31",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 28.1 && averageUserData <= 28.6:
            healthData = {
              bodyFat: "32-33",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 28.6 && averageUserData <= 29:
            healthData = {
              bodyFat: "34-36",
              status: "Above Average",
              statusType: 3,
            };
            break;

          default:
            break;
        }
        break;
      case age >= 41 && age <= 45:
        switch (true) {
          case averageUserData <= 6.7:
            healthData = {
              bodyFat: "2-3",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 6.7 && averageUserData <= 9.2:
            healthData = {
              bodyFat: "4-5",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 9.2 && averageUserData <= 11.5:
            healthData = {
              bodyFat: "6-7",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 11.5 && averageUserData <= 13.8:
            healthData = {
              bodyFat: "8-9",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 13.8 && averageUserData <= 15.9:
            healthData = {
              bodyFat: "10-11",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 15.9 && averageUserData <= 17.8:
            healthData = {
              bodyFat: "12-13",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 17.8 && averageUserData <= 19.6:
            healthData = {
              bodyFat: "14-15",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 19.6 && averageUserData <= 21.3:
            healthData = {
              bodyFat: "16-17",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 21.3 && averageUserData <= 22.8:
            healthData = {
              bodyFat: "18-19",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 22.8 && averageUserData <= 24.7:
            healthData = {
              bodyFat: "20-21",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 24.7 && averageUserData <= 25.5:
            healthData = {
              bodyFat: "22-23",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 25.5 && averageUserData <= 26.6:
            healthData = {
              bodyFat: "24-25",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 26.6 && averageUserData <= 27.6:
            healthData = {
              bodyFat: "26-27",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 27.6 && averageUserData <= 28.4:
            healthData = {
              bodyFat: "28-29",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 28.4 && averageUserData <= 29.1:
            healthData = {
              bodyFat: "30-31",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 29.1 && averageUserData <= 29.7:
            healthData = {
              bodyFat: "32-33",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 29.7 && averageUserData <= 30.1:
            healthData = {
              bodyFat: "34-36",
              status: "Above Average",
              statusType: 3,
            };
            break;

          default:
            break;
        }
        break;
      case age >= 46 && age <= 50:
        switch (true) {
          case averageUserData <= 7.7:
            healthData = {
              bodyFat: "2-3",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 7.7 && averageUserData <= 10.2:
            healthData = {
              bodyFat: "4-5",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 10.2 && averageUserData <= 12.6:
            healthData = {
              bodyFat: "6-7",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 12.6 && averageUserData <= 14.8:
            healthData = {
              bodyFat: "8-9",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 14.8 && averageUserData <= 16.9:
            healthData = {
              bodyFat: "10-11",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 16.9 && averageUserData <= 18.9:
            healthData = {
              bodyFat: "12-13",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 18.9 && averageUserData <= 20.7:
            healthData = {
              bodyFat: "14-15",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 20.7 && averageUserData <= 22.4:
            healthData = {
              bodyFat: "16-17",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 22.4 && averageUserData <= 23.9:
            healthData = {
              bodyFat: "18-19",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 23.9 && averageUserData <= 25.3:
            healthData = {
              bodyFat: "20-21",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 25.3 && averageUserData <= 26.6:
            healthData = {
              bodyFat: "22-23",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 26.6 && averageUserData <= 27.7:
            healthData = {
              bodyFat: "24-25",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 27.7 && averageUserData <= 28.7:
            healthData = {
              bodyFat: "26-27",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 28.7 && averageUserData <= 29.5:
            healthData = {
              bodyFat: "28-29",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 29.5 && averageUserData <= 30.2:
            healthData = {
              bodyFat: "30-31",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 30.2 && averageUserData <= 30.7:
            healthData = {
              bodyFat: "32-33",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 30.7 && averageUserData <= 31.2:
            healthData = {
              bodyFat: "34-36",
              status: "Above Average",
              statusType: 3,
            };
            break;

          default:
            break;
        }
        break;
      case age >= 51 && age <= 55:
        switch (true) {
          case averageUserData <= 8.8:
            healthData = {
              bodyFat: "2-3",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 8.8 && averageUserData <= 11.3:
            healthData = {
              bodyFat: "4-5",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 11.3 && averageUserData <= 13.7:
            healthData = {
              bodyFat: "6-7",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 13.7 && averageUserData <= 15.9:
            healthData = {
              bodyFat: "8-9",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 15.9 && averageUserData <= 18:
            healthData = {
              bodyFat: "10-11",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 18 && averageUserData <= 20:
            healthData = {
              bodyFat: "12-13",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 20 && averageUserData <= 21.8:
            healthData = {
              bodyFat: "14-15",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 21.8 && averageUserData <= 23.4:
            healthData = {
              bodyFat: "16-17",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 23.4 && averageUserData <= 25:
            healthData = {
              bodyFat: "18-19",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 25 && averageUserData <= 26.4:
            healthData = {
              bodyFat: "20-21",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 26.4 && averageUserData <= 27.6:
            healthData = {
              bodyFat: "22-23",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 27.6 && averageUserData <= 28.7:
            healthData = {
              bodyFat: "24-25",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 28.7 && averageUserData <= 29.7:
            healthData = {
              bodyFat: "26-27",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 29.7 && averageUserData <= 30.6:
            healthData = {
              bodyFat: "28-29",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 30.6 && averageUserData <= 31.2:
            healthData = {
              bodyFat: "30-31",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 31.2 && averageUserData <= 31.8:
            healthData = {
              bodyFat: "32-33",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 31.8 && averageUserData <= 32.2:
            healthData = {
              bodyFat: "34-36",
              status: "Above Average",
              statusType: 3,
            };
            break;
          default:
            break;
        }
        break;
      case age >= 56:
        switch (true) {
          case averageUserData <= 9.9:
            healthData = {
              bodyFat: "2-3",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 9.9 && averageUserData <= 12.4:
            healthData = {
              bodyFat: "4-5",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 12.4 && averageUserData <= 14.7:
            healthData = {
              bodyFat: "6-7",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 14.7 && averageUserData <= 17:
            healthData = {
              bodyFat: "8-9",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 17 && averageUserData <= 19.1:
            healthData = {
              bodyFat: "10-11",
              status: "Lean",
              statusType: 0,
            };
            break;
          case averageUserData > 19.1 && averageUserData <= 21:
            healthData = {
              bodyFat: "12-13",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 21 && averageUserData <= 22.8:
            healthData = {
              bodyFat: "14-15",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 22.8 && averageUserData <= 24.5:
            healthData = {
              bodyFat: "16-17",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 24.5 && averageUserData <= 26:
            healthData = {
              bodyFat: "18-19",
              status: "Healthy",
              statusType: 1,
            };
            break;
          case averageUserData > 26 && averageUserData <= 27.4:
            healthData = {
              bodyFat: "20-21",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 27.4 && averageUserData <= 28.7:
            healthData = {
              bodyFat: "22-23",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 28.7 && averageUserData <= 29.8:
            healthData = {
              bodyFat: "24-25",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 29.8 && averageUserData <= 30.8:
            healthData = {
              bodyFat: "26-27",
              status: "Average",
              statusType: 2,
            };
            break;
          case averageUserData > 30.8 && averageUserData <= 31.6:
            healthData = {
              bodyFat: "28-29",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 31.6 && averageUserData <= 32.3:
            healthData = {
              bodyFat: "30-31",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 32.3 && averageUserData <= 32.9:
            healthData = {
              bodyFat: "32-33",
              status: "Above Average",
              statusType: 3,
            };
            break;
          case averageUserData > 32.9 && averageUserData <= 33.3:
            healthData = {
              bodyFat: "34-36",
              status: "Above Average",
              statusType: 3,
            };
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  }

  return healthData;
};
export const covertHealthStatus = (gender, bodyFat) => {
  let result;
  if (gender === 0) {
    if (bodyFat < 2) {
      result = {
        status: "Above Average Zone",
        message: "gain weight",
        type: 3,
      };
    } else if (bodyFat >= 2 && bodyFat <= 6) {
      result = {
        status: "Lean Zone",
        message: "maintain weight or gain a bit weight",
        type: 0,
      };
    } else if (bodyFat > 6 && bodyFat <= 13) {
      result = {
        status: "Healthy Zone",
        message: "maintain weight or lose a bit weight",
        type: 1,
      };
    } else if (bodyFat > 13 && bodyFat <= 22) {
      result = {
        status: "Average Zone",
        message: "lose weight",
        type: 2,
      };
    } else if (bodyFat > 22) {
      result = {
        status: "Danger Zone",
        message: "lose weight",
        type: 3,
      };
    }
  } else {
    if (bodyFat < 2) {
      result = {
        status: "Above Average Zone",
        message: "gain weight",
        type: 3,
      };
    } else if (bodyFat >= 2 && bodyFat <= 8) {
      result = {
        status: "Lean Zone",
        message: "maintain weight or gain a bit weight",
        type: 0,
      };
    } else if (bodyFat > 8 && bodyFat <= 14) {
      result = {
        status: "Healthy Zone",
        message: "maintain weight or lose a bit weight",
        type: 1,
      };
    } else if (bodyFat > 14 && bodyFat <= 23) {
      result = {
        status: "Average Zone",
        message: "lose weight",
        type: 2,
      };
    } else if (bodyFat > 23) {
      result = {
        status: "Danger Zone",
        message: "lose weight",
        type: 3,
      };
    }
  }

  return result;
};
