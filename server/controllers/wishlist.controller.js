module.exports = {
  add: async (req, res) => {
    const { userId, type } = req;
    const itemId = req.params.id;
    try {
      const user = await userModel.findById(userId);
      if (type === "product") {
        user.userWishlist = {
          ...user.userWishlist,
          products:
            user.userWishlist.products.push(itemId) &&
            user.userWishlist.products,
        };
      } else {
        user.userWishlist = {
          ...user.userWishlist,
          service:
            user.userWishlist.services.push(itemId) &&
            user.userWishlist.services,
        };
      }
      await user.save();
      return res.status(200).json({ isSuccess: true, user });
    } catch (error) {}
  },
  delete: async (req, res) => {
    const { userId, type } = req;
    const itemId = req.params.id;
    try {
      const user = await userModel.findById(userId);
      if (type === "product") {
        user.userWishlist = {
          ...user.userWishlist,
          products: user.userWishlist.products.filter(
            (item) => item !== itemId
          ),
        };
      } else {
        user.userWishlist = {
          ...user.userWishlist,
          service: user.userWishlist.services.filter((item) => item !== itemId),
        };
      }
      await user.save();
      return res.status(200).json({ isSuccess: true, user });
    } catch (error) {}
  },
};
