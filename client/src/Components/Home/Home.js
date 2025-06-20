import React from 'react';
import Header from '../Header/Header';
import Banner from '../Banner/Banner';
import Topdeals from '../TopDeals/Topdeals';
import OnSaleProduct from '../OnSaleProducts/OnSaleProduct';
import Banner1 from '../Banner1/Banner1';
import Banner2 from '../Banner2/Banner2';
import BestSelling from '../BestSelling/BestSelling';
import Banner3 from '../Banner3/Banner3';
import ShopByCategories from '../ShopByCategories/ShopByCategories';
import Recommended from '../RecommendedProducts/Recommended';
import CompanyLogo from '../companyLogos/CompanyLogo';
import Footer from '../Footer/Footer';
import CartModal from '../CartModal/CartModal';

export default function Home(props) {
  const { cartItems, totalAmount, isModalOpen, removeFromCart, handleAddToCart, closeModal, handleIncrease, handleDecrease, TopDeals, OnsaleProducts, ShopByCategory, RecommendedProducts } = props;

  return (
    <div>
      <Header cartItems={cartItems} removeFromCart={removeFromCart} totalAmount={totalAmount} handleIncrease={handleIncrease} handleDecrease={handleDecrease} />
      <Banner />
      <Topdeals TopDeals={TopDeals} onAddToCart={handleAddToCart} />
      <OnSaleProduct OnSaleProducts={OnsaleProducts} onAddToCart={handleAddToCart} />
      {isModalOpen && (
        <CartModal 
          cartItems={cartItems} 
          onClose={closeModal} 
          removeFromCart={removeFromCart} 
          handleIncrease={handleIncrease} 
          handleDecrease={handleDecrease}
          totalAmount={totalAmount}
        />
      )}
      <Banner1 />
      <OnSaleProduct OnSaleProducts={OnsaleProducts} onAddToCart={handleAddToCart}/>
      <Banner2 />
      <BestSelling OnSaleProducts={OnsaleProducts} onAddToCart={handleAddToCart}/>
      <Banner3 />
      <ShopByCategories ShopByCategory={ShopByCategory}/>
      <Recommended RecommendedProducts={RecommendedProducts} onAddToCart={handleAddToCart}/>
      <CompanyLogo />
      <Footer />
    </div>
  );
}
