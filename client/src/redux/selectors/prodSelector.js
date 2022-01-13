import { calculateFinalPrice } from "utils/calculate";
export const prodFilterSelector = (prodReducer, filterOptions) => {
  let { listProducts } = prodReducer;
  const { category, price, favorite, cateFilter } = filterOptions;
  if (favorite.isChosen) listProducts = favorite.listFavorites;
  return {
    ...prodReducer,
    listProducts: listProducts.filter((prod) => {
      let filterProd = calculateFinalPrice(prod);
      let checkPrice = false;

      //   switch (price) {
      //     case 0: // 10-40
      //       checkPrice = filterProd >= 10 && filterProd < 40;
      //       break;
      //     case 1: // 40-80
      //       checkPrice = filterProd >= 40 && filterProd < 80;
      //       break;
      //     case 2: // 80-100
      //       checkPrice = filterProd >= 80 && filterProd <= 100;
      //       break;
      //     default:
      //       checkPrice = true;
      //       break;
      //   }
      checkPrice = price ? filterProd >= 0 && filterProd <= price : true;
      console.log(
        cateFilter
          ? prod.prodCategory.cateFilter._id.toString() === cateFilter
          : true
      );

      return category !== "All"
        ? prod.prodCategory.cateName._id.toString() === category &&
            checkPrice &&
            (cateFilter
              ? prod.prodCategory.cateFilter._id.toString() === cateFilter
              : true)
        : checkPrice;
    }),
  };
};
