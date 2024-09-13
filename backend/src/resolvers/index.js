const index = {
  Query: {
    users: async (_, __, { models }) => models.User.findAll(),
    products: async (_, { category, minPrice, maxPrice }, { models }) => {
      const where = {};

      if (category) {
        where.category = category;
      }

      if (minPrice != null && maxPrice != null) {
        where.price = {
          [models.Sequelize.Op.between]: [minPrice, maxPrice],
        };
      } else if (minPrice != null) {
        where.price = {
          [models.Sequelize.Op.gte]: minPrice,
        };
      } else if (maxPrice != null) {
        where.price = {
          [models.Sequelize.Op.lte]: maxPrice,
        };
      }

      return models.Product.findAll({ where });
    },
    carts: async (_, __, { models }) => models.Cart.findAll(),
    cartItems: async (_, __, { models }) => models.CartItem.findAll(),
  },
  Mutation: {
    createUser: async (_, { email, username }, { models }) => {
      return models.User.create({ email, username });
    },
    createProduct: async (_, { title, price }, { models }) => {
      return models.Product.create({ title, price });
    },
    createCart: async (_, { user_id }, { models }) => {
      return models.Cart.create({ user_id });
    },
    addItemToCart: async (_, { cart_id, product_id, quantity }, { models }) => {
      return models.CartItem.create({ cart_id, product_id, quantity });
    },
  },
  Cart: {
    user: async (cart, _, { models }) => models.User.findByPk(cart.user_id),
    items: async (cart, _, { models }) =>
      models.CartItem.findAll({ where: { cart_id: cart.id } }),
  },
  CartItem: {
    cart: async (cartItem, _, { models }) =>
      models.Cart.findByPk(cartItem.cart_id),
    product: async (cartItem, _, { models }) =>
      models.Product.findByPk(cartItem.product_id),
  },
};

export default index;
