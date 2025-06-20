import './App.css';
import Home from "./Components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewCart from "./Components/ViewCart/ViewCart";
// import Header from "./Components/Header/Header";
// import CartModal from './Components/CartModal/CartModal';
import { useState, useEffect } from "react";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { apiList } from './services/apilist';
import axios from 'axios';
import Cookies from 'js-cookie';
import LoginModal from './Components/LoginModal/LoginModal';

import PageNotFound from './Components/PageNotFound/PageNotfound';



function App() {


  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [TopDeals, setTopDeals] = useState([]);
  const [OnsaleProducts, setOnsaleProducts] = useState([]);
  const [RecommendedProducts, setRecommendedProducts] = useState([]);
  const [loginBtn, setLoginBtn] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(Cookies.get('authToken'));




  const closeLoginModal = () => setLoginModalOpen(false);


  useEffect(() => {
    // Check if the authToken cookie is present
    const token = Cookies.get('authToken');
    setIsLoggedIn(!!token);
  }, []); // Empty dependency array to run only on component mount

  useEffect(() => {
    // Optionally: Add this effect if you want to log state changes or perform other actions
    // console.log(`Logged in: ${isLoggedIn}`);
  }, [isLoggedIn]);
  const handleLogout = () => {
    // Remove the authToken cookie
    Cookies.remove('authToken');
    setIsLoggedIn(false);
    closeLoginModal();
  };

  useEffect(() => {
    const total = cartItems.reduce((total, item) => {
      const price = Number(item.productDetails?.price);
      const quantity = Number(item.quantity);
      // console.log(`Price: ${price}, Quantity: ${quantity}`); // Log values
      return total + (price * quantity);
    }, 0);
    setTotalAmount(total);
  }, [cartItems]);

  useEffect(() => {
    fetchProducts();
    fetchCartItems();
  }, [])

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(apiList.cartItems);
      setCartItems(response.data);
    } catch (error) {
      console.error("Failed to fetch cart items : ", error);
    }
  }

  const handleAddToCart = async (product) => {
    const token = Cookies.get('authToken');


    if (!token) {
      alert('Please log in to add to cart');
      setLoginModalOpen(true);
      return;
    }

    try {
      await axios.post(apiList.addToCart, {
        productId: product._id, // Ensure this is correct
        quantity: 1,
        productDetails: {
          // Include necessary details
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl
        }
      });
      fetchCartItems(); // Refresh cart items
      setModalOpen(true); // Show cart modal
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };


  const handleIncrease = async (index) => {
    try {
      const item = cartItems[index];
      await axios.post(apiList.increaseCartItem, { productId: item.productId, quantity: 1 });
      fetchCartItems(); // Refresh cart items
    } catch (error) {
      console.error('Failed to increase item quantity:', error);
    }
  };


  const handleDecrease = async (index) => {
    try {
      const item = cartItems[index];
      if (item.quantity > 1) {
        await axios.post(apiList.decreaseCartItem, { productId: item.productId });
        fetchCartItems(); // Refresh cart items
      } else {
        console.warn('Item quantity is already at minimum');
      }
    } catch (error) {
      console.error('Failed to decrease item quantity:', error);
    }
  };


  const removeFromCart = async (index) => {
    try {
      const itemId = cartItems[index]._id;
      if (!itemId) {
        throw new Error('Item ID is missing');
      }

      console.log(`Sending DELETE request to: http://localhost:4445/api/delete-cart-item/${itemId}`);

      const response = await axios.delete(`http://localhost:4445/api/delete-cart-item/${itemId}`);
      console.log('Response:', response.data);

      fetchCartItems(); // Refresh cart items
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };


  const handleDeleteAll = async () => {
    try {
      const response = await axios.delete(apiList.deleteCartItems);
      if (response.status === 200) {
        fetchCartItems(); // Refresh cart items
      } else {
        console.error('Failed to clear cart. Status:', response.status);
      }
    } catch (error) {
      console.error('Failed to clear cart:', error.response?.data || error.message);
    }
  };

  const toggleCartModal = () => {
    setModalOpen((prevState) => !prevState);
  };

  const openModal = () => {
    setModalOpen(true);

  }; const closeModal = () => {
    setModalOpen(false);
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(apiList.products);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }


      const data = await response.json();

      if (!Array.isArray(data.data)) {
        throw new TypeError('API response is not an array');
      }

      setTopDeals(data.data.filter(product => product.name.toLowerCase() === 'top-deals'));
      setOnsaleProducts(data.data.filter(product => product.name.toLowerCase() === "onsale-products"));
      setRecommendedProducts(data.data.filter(product => product.name.toLowerCase() === "recommendedproducts"));

    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };


  const ShopByCategory = [
    {
      shop_id: 1,
      id: 8,
      shop_image: "https://demo-morata.myshopify.com/cdn/shop/files/coll_2_1.png?v=1700206738&width=1500",
      shop_title: "Home Entertainment",
      categories: ["Bags&Accessories", "Accessories", "Clothing", "Maternety", "Shoes", "Sports Wear"]
    },
    {
      shop_id: 2,
      id: 9,
      shop_image: "https://demo-morata.myshopify.com/cdn/shop/files/coll_2_2.png?v=1700206738&width=1500",
      shop_title: "Phones & Tablets",
      categories: ["Bags&Accessories", "Accessories", "Clothing", "Maternety", "Shoes", "Sports Wear"]
    },
    {
      shop_id: 3,
      id: 10,
      shop_image: "https://demo-morata.myshopify.com/cdn/shop/files/coll_2_3.png?v=1700206738&width=1500",
      shop_title: "Fashion & Clothing",
      categories: ["Bags&Accessories", "Accessories", "Clothing", "Maternety", "Shoes", "Sports Wear"]
    },
    {
      shop_id: 4,
      id: 11,
      shop_image: "https://demo-morata.myshopify.com/cdn/shop/files/coll_2_4.png?v=1700206738&width=1500",
      shop_title: "Garden & Kitchen",
      categories: ["Bags&Accessories", "Accessories", "Clothing", "Maternety", "Shoes", "Sports Wear"]
    },
    {
      shop_id: 5,
      id: 12,
      shop_image: "https://demo-morata.myshopify.com/cdn/shop/files/coll_2_5.png?v=1700206738&width=1500",
      shop_title: "Cameras & Drones",
      categories: ["Bags&Accessories", "Accessories", "Clothing", "Maternety", "Shoes", "Sports Wear"]
    }
  ]

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <Home
              cartItems={cartItems}
              totalAmount={totalAmount}
              isModalOpen={isModalOpen}
              removeFromCart={removeFromCart}
              handleAddToCart={handleAddToCart}
              toggleCartModal={toggleCartModal}
              openModal={openModal}
              closeModal={closeModal}
              handleIncrease={handleIncrease}
              handleDecrease={handleDecrease}
              TopDeals={TopDeals}
              OnsaleProducts={OnsaleProducts}
              ShopByCategory={ShopByCategory}
              RecommendedProducts={RecommendedProducts}
            />
          } />
          <Route path="/view-cart" element={
            <ViewCart
              cartItems={cartItems}
              totalAmount={totalAmount}
              isModalOpen={isModalOpen}
              removeFromCart={removeFromCart}
              handleAddToCart={handleAddToCart}
              toggleCartModal={toggleCartModal}
              openModal={openModal}
              closeModal={closeModal}
              handleIncrease={handleIncrease}
              handleDecrease={handleDecrease}
              handleDeleteAll={handleDeleteAll}
            />
          } />
          <Route path="/product/:productId" element={<ProductDetails
            cartItems={cartItems}
            totalAmount={totalAmount}
            isModalOpen={isModalOpen}
            removeFromCart={removeFromCart}
            handleAddToCart={handleAddToCart}
            toggleCartModal={toggleCartModal}
            openModal={openModal}
            closeModal={closeModal}
            handleIncrease={handleIncrease}
            handleDecrease={handleDecrease}
            TopDeals={TopDeals}
            OnsaleProducts={OnsaleProducts}
            ShopByCategory={ShopByCategory}
            RecommendedProducts={RecommendedProducts}
          />} />
          {/* <Route path="*" element={<PageNotFound />} /> */}
          <Route path="*" element={<PageNotFound
            cartItems={cartItems}
            totalAmount={totalAmount}
            isModalOpen={isModalOpen}
            removeFromCart={removeFromCart}
            handleAddToCart={handleAddToCart}
            toggleCartModal={toggleCartModal}
            openModal={openModal}
            closeModal={closeModal}
            handleIncrease={handleIncrease}
            handleDecrease={handleDecrease}
          />} />
        </Routes>
        {isLoginModalOpen && (
          <LoginModal loginBtn={loginBtn}
            setLoginBtn={setLoginBtn}
            closeLoginModal={closeLoginModal}
            setLoginModalOpen={setLoginModalOpen}
            setIsLoggedIn={setIsLoggedIn} />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
