const { generateUniqueId } = require('./utils');

class CartManager {
    constructor() {
        this.carts = {};
    }

    createCart() {
        const cartId = generateUniqueId();
        this.carts[cartId] = { products: [] };
        return cartId;
    }

    getCart(cartId) {
        return this.carts[cartId] || null;
    }

    addProductToCart(cartId, productId, quantity) {
        const cart = this.getCart(cartId);

        if (!cart) {
            console.log('Carrito no encontrado');
            return;
        }

        const existingProductIndex = cart.products.findIndex(item => item.productId === productId);

        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }
    }

    removeProductFromCart(cartId, productId) {
        const cart = this.getCart(cartId);

        if (!cart) {
            console.log('Carrito no encontrado');
            return;
        }
        cart.products = cart.products.filter(item => item.productId !== productId);
    }
}

module.exports = CartManager;
