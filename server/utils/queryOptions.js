module.exports = {
  getQueryOptions: (options) => {
    return {
      skipItem: (+options.page - 1) * options.size,
      pageSize: +options.size,
    };
  },
};
