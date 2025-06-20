const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')

const { Products, ProductDetails, CartItem } = require("../models/Products")

router.get("/products", async (req, res) => {
    try {
        const products = await Products.find();
        res.status(200).json({ data: products });
    }
    catch (e) {
        console.log("/products", e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

 
router.get("/productDetails", async (req, res) => {
    try {
        const productDetails = await ProductDetails.find(); // More comprehensive data
        res.status(200).json({ data: productDetails });
    } catch (e) {
        console.log("/product-details", e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/product/:productId", async (req, res) => {
    const { productId } = req.params;


    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Invalid productId format" });
    }

    try {

        const productDetails = await ProductDetails.findById(productId);

        if (!productDetails) {
            return res.status(404).json({ message: "Product not found with Id" });
        }

        return res.status(200).json({ data: [productDetails] });
    } catch (e) {
        console.log("/product/:productId", e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/cart-items", async (req, res) => {
    try {
        const items = await CartItem.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
})

router.post('/add-cart-item', async (req, res) => {
    try {
        const { productId, quantity = 1, productDetails } = req.body;

        // Validate input
        if (!productId) {
            return res.status(400).send('Product ID is required');
        }

        // Find existing item in the cart
        let existingItem = await CartItem.findOne({ productId });

        if (existingItem) {
            // Update existing item quantity
            existingItem.quantity = (existingItem.quantity || 1) + (quantity || 1);

            // Optionally update productDetails if needed
            if (productDetails) {
                existingItem.productDetails = productDetails;
            }

            await existingItem.save();
        } else {
            // Add new item to the cart
            const newItem = new CartItem({
                productId,
                quantity: quantity > 0 ? quantity : 1, // Ensure quantity is at least 1
                productDetails
            });
            await newItem.save();
        }

        res.status(200).send('Item added/updated successfully');
    } catch (err) {
        console.error('Error adding/updating cart item:', err.message);
        res.status(500).send('Internal server error');
    }
});



// Decrease cart item quantity
router.post('/decrease-cart-item', async (req, res) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).send('Product ID is required');
        }

        let existingItem = await CartItem.findOne({ productId });

        if (existingItem) {
            existingItem.quantity = Math.max(1, existingItem.quantity - 1);
            await existingItem.save();
        } else {
            return res.status(400).send('Item not found in cart');
        }

        res.status(200).send('Item quantity updated successfully');
    } catch (err) {
        console.error('Error updating cart item:', err.message);
        res.status(500).send('Internal server error');
    }
});



// Delete Cart Item
router.delete('/delete-cart-item/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Received request to delete item with ID:', id);

        if (!id) {
            return res.status(400).send('Item ID is required');
        }

        const result = await CartItem.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send('Item not found');
        }

        res.status(200).send('Item removed successfully');
    } catch (err) {
        console.error('Error removing cart item:', err.message);
        res.status(500).send('Internal server error');
    }
});


router.post('/increase-cart-item', async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;

        // Validate input
        if (!productId) {
            return res.status(400).send('Product ID is required');
        }

        // Find existing item in the cart
        let existingItem = await CartItem.findOne({ productId });

        if (existingItem) {
            // Update existing item quantity
            existingItem.quantity = (existingItem.quantity || 1) + (quantity || 1);
            await existingItem.save();
        } else {
            // If item does not exist, add it with initial quantity of 1
            const newItem = new CartItem({
                productId,
                quantity: 1, // Initial quantity
            });
            await newItem.save();
        }

        res.status(200).send('Item updated successfully');
    } catch (err) {
        console.error('Error updating cart item:', err.message);
        res.status(500).send('Internal server error');
    }
});


router.delete('/delete-cartitems', async (req, res) => {
    try {
        // Delete all items in the cart
        await CartItem.deleteMany({});
        res.status(200).send('All items removed from cart');
    } catch (err) {
        console.error('Error removing all cart items:', err.message);
        res.status(500).send('Internal server error');
    }
});

 
module.exports = router;