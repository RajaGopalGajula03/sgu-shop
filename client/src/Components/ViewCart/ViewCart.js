import React from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import "./ViewCart.css";
import { useState, useEffect } from 'react';
import Footer from '../Footer/Footer';

export default function ViewCart(props) {
  const { cartItems, totalAmount, isModalOpen, removeFromCart, handleAddToCart, toggleCartModal, openModal, closeModal, handleIncrease, handleDecrease, handleDeleteAll } = props;

  // console.log(cartItems)
  const [timeRemaining, setTimeRemaining] = useState(3600); // 3600 seconds = 1 hour

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 0) {
          return 3600; // Reset to 1 hour when timer hits 0
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format the remaining time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
  };

  const FREE_SHIPPING_LIMIT = 500;
  const remainingAmount = Math.max(FREE_SHIPPING_LIMIT - totalAmount, 0);
  const progressPercentage = Math.min((totalAmount / FREE_SHIPPING_LIMIT) * 100, 100);

  // Debugging statement
  // console.log('Cart Items:', cartItems);

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
      <div className='Your-cart-div'>
        <h4 className='heading4'>Your Cart</h4>
        <div className='return-home-div'>
          <Link to='/' className='home-text1'>Home</Link><span className='your-cart-text'> / Your Cart</span>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className='empty-cart-container'>
          <h3>Your cart is empty</h3>
          <Link to='/' className='continue-shopping-link'>
            CONTINUE SHOPPING
          </Link>
        </div>
      ) : (
        <>
          <div className='hurry-up-div'>
            <i className="fa-solid fa-circle-exclamation"></i>
            <p className='hurry-up-text'>
              Please, hurry! Someone has placed an order on one of the items you have in the cart.
              Products are limited, checkout within <span className='hurry-up-time'>{formatTime(timeRemaining)} s</span>
            </p>
          </div>
          <div className='cart-details-div1 d-flex flex-wrap'>
            <div className='left-side-div'>
              <table className="shopping-cart-content">
                <tbody>
                  <tr className="title">
                    <td className="product-name"><div className="h3">PRODUCT</div></td>
                    <td className="quantity-item"><div className="h3">QUANTITY</div></td>
                    <td className="total"><div className="h3">SUBTOTAL:</div></td>
                    <td className="delete-item"><div></div></td>
                  </tr>
                  {cartItems.map((item, index) => {
                    // Debugging statement
                    // console.log('Item:', item);
                    return (
                      <tr key={item._id} className='cart-item-container'>
                        <td>
                          <div className='cart-image1-div'>
                            <Link to={`/product/${item.productId}`}>
                              <img
                                src={item.productDetails?.imageUrl}
                                className='cart-image1'
                                alt={item.productDetails?.title}
                              /></Link>
                            <div className='view-cart-text'>
                              <Link className='view-cart-text1' to={`/product/${item.productId}`}>{item.productDetails?.title}</Link>
                              <span className='view-cart-price'>£ {item.productDetails?.price.toFixed(2)}</span>
                            </div>
                          </div>
                        </td>
                        <div className='amount-increse d-flex align-items-center justify-content-between'>
                          <td>
                            <div className='itemCount-div1'>
                              <button className='decreaseBtn1' onClick={() => handleDecrease(index)}>-</button>
                              <p className='count1'>{item.quantity.toString().padStart(2, '0')}</p>
                              <button className='increaseBtn1' onClick={() => handleIncrease(index)}>+</button>
                            </div>
                          </td>
                          <td>
                            <div className='cart-amount1'>
                              £ {(item.productDetails?.price * item.quantity).toFixed(2)}
                            </div>
                          </td>
                        </div>
                        <td>
                          <div className='trash-btn1'>
                            <button onClick={() => removeFromCart(index)} className='delete-btn'>
                              <i className="fa-regular fa-trash-can"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  <tr className='shopping-btn1'>
                    <td className='continue-shopping'>
                      <Link to="/"><button className='continue-shopping-btn'>CONTINUE SHOPPING</button></Link>
                    </td>
                    <td className='delete-all'>
                      <button className='delete-all-btn' onClick={handleDeleteAll}>DELETE ALL</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className='add-gift-div'>
                <div className='gift-content'>
                  <i className="fa-solid fa-gift"></i>
                  <p className='gift-content'>Do you want a gift wrap?</p>
                  <p className='gift-discount'> &nbsp;£ Only 2.00</p>
                </div>
                <div className='gift-btn-div'>
                  <button className='giftBtn'>ADD A GIFT WRAP</button>
                </div>
              </div>
              <div className='Add-order-div'>
                <h4 className='order-heading'>ADD ORDER NOTE</h4>
                <textarea placeholder='How can we help you?' cols='100' rows='5' className='order-content'></textarea>
              </div>
            </div>
            <div className='right-side-div'>
              <div className='free-shipping-div'>
                <div className='progress'>
                  <div
                    className='progress-bar progress-bar-striped active'
                    role='progressbar'
                    style={{ width: `${progressPercentage}%`, backgroundColor: 'red' }}
                    aria-valuenow={progressPercentage}
                    aria-valuemin='0'
                    aria-valuemax='100'
                  ></div>
                  <i
                    className="fa-solid fa-truck-fast"
                    style={{ left: `${progressPercentage}%`, color: 'white' }}
                  ></i>
                </div>
                {remainingAmount > 0 ? (
                  <p className='free-shipping-text'>
                    Spend £{remainingAmount.toFixed(2)} more to get <span className='free-shipping'> &nbsp;free shipping!</span>
                  </p>
                ) : (
                  <p className='free-shipping-text'>
                    Congratulations! You've got <span className='free-shipping'> &nbsp;free shipping!</span>
                  </p>
                )}
              </div>
              <h4 className='heading-4'>Cart totals</h4>
              <hr></hr>
              <div className='sub-total'>
                <h4 className='heading-4'>Subtotal</h4>
                <p className='total-amount'>£ {totalAmount.toFixed(2)}</p>
              </div>
              <hr></hr>
              <h4 className='heading-4'>Estimate shipping rates : </h4>
              <h4 className='heading-4'>Country</h4>
              <select className='select-Country'>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>India</option>
                <option>South Africa</option>
                <option>Germany</option>
                <option>Australia</option>
              </select>
              <h4 className='heading-4'>State</h4>
              <select className='select-state'>
                <option>Guntur</option>
                <option>Vijayawada</option>
                <option>Vizag</option>
                <option>Kadapa</option>
                <option>Tirupati</option>
                <option>Palnadu</option>
              </select>
              <h4 className='heading-4'>Zip/Postal Code</h4>
              <input type='text' placeholder='Zip/Postal Code' className='w-100'></input>
              <button className='calculate-shipping-rate'>CALCULATE SHIPPING RATES</button>
              <hr></hr>
              <h4 className='heading-4'>Coupon</h4>
              <p className='para'>Coupon code will work on checkout page.</p>
              <input type='text' placeholder='Coupon code' className='w-100'></input>
              <hr></hr>
              <div className='your-saving d-flex align-items-center justify-content-between'>
                <h4 className='heading-4'>You save in total</h4>
                <p className='para'>£ 20.00</p>
              </div>
              <hr></hr>
              <div className='order-total d-flex align-items-center justify-content-between'>
                <h4 className='heading-4'>Order Totals</h4>
                <p className='para text-success'>£ {totalAmount.toFixed(2)}</p>
              </div>
              <hr></hr>
              <div className='terms d-flex align-items-center'>
                <input type='checkbox' className='mr-2'></input>
                <p className='para'>I agree with Terms & Conditions</p>
              </div>
              <button className='check-out w-100 bg-secondary text-white'>CHECK OUT</button>
              <button className='shop-pay w-100 bg-primary text-white'>shop pay</button>
            </div>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}
