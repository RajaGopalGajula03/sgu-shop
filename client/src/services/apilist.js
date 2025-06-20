const server = "http://localhost:4445"

export const apiList = {
    signup:`${server}/auth/signup`,
    login:`${server}/auth/login`,
    products:`${server}/api/products`,
    productDetails:`${server}/api/product/:productId`,
    allProductDetails:`${server}/api/productDetails`,
    cartItems:`${server}/api/cart-items`,
    addToCart:`${server}/api/add-cart-item`,
    decreaseCartItem:`${server}/api/decrease-cart-item`,
    increaseCartItem:`${server}/api/increase-cart-item`,
    deleteCartItems:`${server}/api/delete-cartitems`
}