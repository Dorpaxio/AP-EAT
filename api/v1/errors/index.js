module.exports = {
    APEatError: require('./APEatError'),
    NotFoundError: require('./NotFoundErrors/NotFoundError'),
    MenuNotFoundError: require('./NotFoundErrors/MenuNotFoundError'),
    RestaurantNotFoundError: require('./NotFoundErrors/RestaurantNotFoundError'),
    ConflictError: require('./ConflictError'),
    ForbiddenError: require('./ForbiddenErrors/ForbiddenError'),
    UnauthorizedError: require('./UnauthorizedError'),
    UserNotFoundError: require('./NotFoundErrors/UserNotFoundError'),
    CartNotFoundError: require('./NotFoundErrors/CartNotFoundError'),
    ProductNotFoundError: require('./NotFoundErrors/ProductNotFoundError'),
    NotRestaurantOwnerError: require('./ForbiddenErrors/NotRestaurantOwnerError'),
    OrderNotFoundError: require('./NotFoundErrors/OrderNotFoundError')
}
