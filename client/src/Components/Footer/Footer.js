import React from 'react';
import "./Footer.css";

export default function Footer() {
  return (
    <div className='footer-container'>
        <div className='footer-div d-flex flex-wrap'>
            <div className='logo1-div col-xm-12'>
                <img src='https://res.cloudinary.com/dhpkv1tec/image/upload/v1722513876/natural%20places/SGU_SHOP_LOGO_TRANSPARENT_lxgqrq.png' className='logo1-image' alt='sgu-logo'></img>
                <p className='hot-line1'>Hotline Free 24/24: </p>
                <p className='hotline-number'>(+100) 123 456 7890</p>
                <p className='address1'>Add: 1234 Heaven Stress, Beverly Hill,<br></br>
                    Melbourne, USA.<br></br>
                    Email: Contact@erentheme.com
                </p>
            </div>
            <div className='myaccount-div col-xm-12'>
                <p className='myaccount-title'>My Account</p>
                <a className='footer-text1' href='#'>Product Support</a>
                <a className='footer-text1' href='#'>Checkout</a>
                <a className='footer-text1' href='#'>Shopping Cart</a>
                <a className='footer-text1' href='#'>Wishlist</a>
                <a className='footer-text1' href='#'>Custom Link</a>
                <a className='footer-text1' href='#'>Redeem Voucher</a>
            </div>
            <div className='myaccount-div col-xm-12'>
                <p className='myaccount-title'>Customer Service</p>
                <a className='footer-text1' href='#'>Help Center</a>
                <a className='footer-text1' href='#'>Contact Us</a>
                <a className='footer-text1' href='#'>Report Abuse</a>
                <a className='footer-text1' href='#'>Submit a Dispute</a>
                <a className='footer-text1' href='#'>Policies & Rules</a>
                <a className='footer-text1' href='#'>Online Returns</a>
            </div>
            <div className='myaccount-div col-xm-12'>
                <p className='myaccount-title'>Help & Customer Care</p>
                <a className='footer-text1' href='#'>New Customers</a>
                <a className='footer-text1' href='#'>How To Use My Account</a>
                <a className='footer-text1' href='#'>Placing an Order</a>
                <a className='footer-text1' href='#'>Payment Methods</a>
                <a className='footer-text1' href='#'>Delivery & Dispatch</a>
                <a className='footer-text1' href='#'>Problems With Your Order</a>
            </div>
            <div className='myaccount-div col-xm-12'>
                <p className='myaccount-title'>Sign Up To Newsletter</p>
                <p className='footer-text1'>Join 60.000+ subscribers and get a new <br></br>discount coupon on every Saturday.</p>
                <div className='email-input mt-3'>
                    <input type='email' className='email-text1' placeholder='Your Email Address.. '></input>
                    <button className='subscribe-btn'>SUBSCRIBE</button>
                </div>
                <p className='footer-text2'>
                    By providing your email address, you agree to our <br></br>Privacy Policy and Terms of Service.
                </p>
            </div>
        </div>
        <hr></hr>
        <div className='footer-div1 d-flex flex-wrap'>
            <p className='copy-right col-xm-12'>Copyright © <span className='color-change'>Morata</span>. All Rights Reserved. Powered by <span className='color-change'>Alothemes</span>.</p>
            <div className='ecommerce-image col-xm-12'>
                <img className='e-commerce-image' src='https://demo-morata.myshopify.com/cdn/shopifycloud/shopify/assets/payment_icons/amazon-92e856f82cae5a564cd0f70457f11af4d58fa037cf6e5ab7adf76f6fd3b9cafe.svg' alt='image'></img>
                <img className='e-commerce-image' src='https://demo-morata.myshopify.com/cdn/shopifycloud/shopify/assets/payment_icons/apple_pay-f6db0077dc7c325b436ecbdcf254239100b35b70b1663bc7523d7c424901fa09.svg' alt='image'></img>
                <img className='e-commerce-image' src='https://demo-morata.myshopify.com/cdn/shopifycloud/shopify/assets/payment_icons/maestro-d2055c6b416c46cf134f393e1df6e0ba31722b623870f954afd392092207889c.svg' alt='image'></img>
                <img className='e-commerce-image' src='https://demo-morata.myshopify.com/cdn/shopifycloud/shopify/assets/payment_icons/master-173035bc8124581983d4efa50cf8626e8553c2b311353fbf67485f9c1a2b88d1.svg' alt='image'></img>
                <img className='e-commerce-image' src='https://demo-morata.myshopify.com/cdn/shopifycloud/shopify/assets/payment_icons/paypal-49e4c1e03244b6d2de0d270ca0d22dd15da6e92cc7266e93eb43762df5aa355d.svg' alt='image'></img>
                <img className='e-commerce-image' src='https://demo-morata.myshopify.com/cdn/shopifycloud/shopify/assets/payment_icons/shopify_pay-957a48d1202dc65a7890b292de764ee886f7e64cea486ae82e291e9dc824c914.svg' alt='image'></img>
                <img className='e-commerce-image' src='https://demo-morata.myshopify.com/cdn/shopifycloud/shopify/assets/payment_icons/visa-319d545c6fd255c9aad5eeaad21fd6f7f7b4fdbdb1a35ce83b89cca12a187f00.svg' alt='image'></img>
            </div>
        </div>
    </div>
  )
}
