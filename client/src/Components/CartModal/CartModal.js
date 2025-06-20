import React from 'react';
import './CartModal.css';
import { Link } from 'react-router-dom';

export default function CartModal(props) {
    const { cartItems, onClose, removeFromCart, handleIncrease, handleDecrease, totalAmount } = props;

    // Ensure totalAmount is a number and set default value to 0 if undefined
    const formattedTotalAmount = totalAmount != null ? totalAmount.toFixed(2) : '0.00';

    // console.log(totalAmount);

    return (
        <div className='cart-modal'>
            <div className='cart-modal-header'>
                <p className='shopping-text'>SHOPPING CART</p>
                <button type="button" className="close" onClick={onClose}>&times;</button>
            </div>
            <div className='cart-modal-content'>
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <div key={index} className='cart-item'>
                            <div>
                                <img src={item.productDetails?.imageUrl} alt={item.productDetails?.title} className='cart-item-image' />
                            </div>
                            <div className='cart-item-details'>
                                <p className='cart-title'>{item.productDetails?.title}</p>
                                <p className='cart-amount'>£{(item.productDetails?.price * (item.quantity || 1)).toFixed(2)}</p>
                                <div className='itemCount-div'>
                                    <button className='decreaseBtn' onClick={() => handleDecrease(index)}>-</button>
                                    <p className='count'>{(item.quantity || 1).toString().padStart(2, '0')}</p>
                                    <button className='increaseBtn' onClick={() => handleIncrease(index)}>+</button>
                                </div>
                            </div>
                            <div className='trash-btn'>
                                <button onClick={() => removeFromCart(index)} className='delete-btn'>
                                    <i className="fa-regular fa-trash-can"></i>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>
            <hr></hr>
            <div className='modal-footer1'>
                <div className='sub-total1'>
                    <p className='sub-title1'>SUBTOTAL:</p>
                    <span className='cart-total-amount1'>£{formattedTotalAmount}</span>
                </div>
                <div className='view-cart-btns1'>
                    <Link to="/view-cart" className='view-cart-btn' onClick={onClose}>VIEW CART</Link>
                    <button className='check-out-btn'>CHECK OUT</button>
                </div>
            </div>
        </div>
    );
}
