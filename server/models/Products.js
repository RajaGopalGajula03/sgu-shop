const mongoose = require("mongoose");


const productsSchema = new mongoose.Schema({
    title:String,
    name:String,
    price:Number,
    screen:String,
    os:String,
    inches:String,
    discount:Number,
    imageUrl:String,
    imageHoverUrl:String,
    sold:Number,
    review:Number,
    daysleft:Number,
})

const Products = mongoose.model("Products",productsSchema);

const descriptionSchema = new mongoose.Schema({
    title:String,
    workwonders:String,
    productQuality:String,
})
const additionalSchema = new mongoose.Schema({
    Color:String,
    Product_Type:String,
    Storage:String,
    Brand:String,
    Display:String,
    Capacity:String,
    Chip:String,
    Camera:String,
    Front_Camera:String,
    Battery_Life:String,
    IntheBox:String,
    Height:String,
    Width:String,
    Weight:String,
    MobileNetwork:String,
})

const shippingSchema = new mongoose.Schema({
    one:String,
    two:String,
    three:String,
    four:String,
    five:String
})
const ReturnSchema = new mongoose.Schema({
    one:String,
    two:String
})
const shippingReturnSchema = new mongoose.Schema({
   Shipping:{shippingSchema},
   Return:{ReturnSchema}
})

const shopbycategorySchema = new mongoose.Schema({
    shop_image:String,
    shop_title:String,
    categories:[]
})

const ShopByCategory = mongoose.model("ShopByCategory",shopbycategorySchema)

const productDetailsSchema = new mongoose.Schema({
    title:String,
    name:String,
    price:Number,
    screen:String,
    os:String,
    inches:String,
    discount:Number,
    imageUrl:String,
    imageHoverUrl:String,
    sold:Number,
    review:Number,
    daysleft:Number,
    stock:Number,
    delivery:String,
    avalibility:String,
    sku:String,
    vendor:String,
    categories:String,
    tags:String,
    description:{descriptionSchema},
    additionalInformation:{additionalSchema},
    ShippingReturn:{shippingReturnSchema}
})

const ProductDetails = mongoose.model("ProductDetails",productDetailsSchema)

const cartItemSchema = new mongoose.Schema({
    productId:String,
    quantity:Number,
    productDetails:Object
})

const CartItem = mongoose.model('CartItem',cartItemSchema)
module.exports = {Products,ProductDetails,ShopByCategory,CartItem}