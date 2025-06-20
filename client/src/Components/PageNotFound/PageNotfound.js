import React from 'react'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import "./PageNotfound.css";

export default function PageNotFound(props) {

    const { cartItems, totalAmount, isModalOpen, removeFromCart, handleAddToCart, toggleCartModal, openModal, closeModal, handleIncrease, handleDecrease, handleDeleteAll } = props;

    return (
        <div>
            <Header
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
            />
            <div className='pagenot-found-div'>
                <div className='return-home-div'>
                    <Link to='/' className='home-text2'>Return to Home</Link>
                </div>
                <img className='page-notfound-image' src='https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg' alt='page not found'/>
                <p className='page-notfound-text'>Page Not Found</p>
            </div>

            <Footer />
        </div>
    )
}
