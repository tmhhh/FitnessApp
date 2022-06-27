export const formatCurrency = (number) =>
  number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
export const convertStringToKCAL = (string) => string + " Kcal";
