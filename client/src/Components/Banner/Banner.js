import React from 'react';
import './Banner.css'; // Ensure to import the CSS file

export default function Banner() {
    return (
        <div>
            <div className='banner-div'>
                <div id="demo" className="carousel slide col-lg-8 col-12" data-ride="carousel">
                    <ul className="carousel-indicators">
                        <li data-target="#demo" data-slide-to="0" className="active"></li>
                        <li data-target="#demo" data-slide-to="1"></li>
                        <li data-target="#demo" data-slide-to="2"></li>
                    </ul>
                    <div className="carousel-inner">
                        <div className="carousel-item active samsung">
                            <div className="carousel-caption">
                                <h3>Samsung <br />Wireless Speakers<br />Multi-Room Audio</h3>
                                <p>From the backyard to the beach, stream audio wirelessly<br /> from any bluetooth device with the speaker that<br /> packs big sound into a slim, portable package.</p>
                                <button className='get-btn'>Get It Now</button>
                            </div>
                        </div>
                        <div className="carousel-item washing">
                            <div className="carousel-caption">
                                <h3>Big Sale Off<br />Washing Machine</h3>
                                <p>Powerful steam Eliminates Stains Without Pre-treatment<br />Super Speed. Wash a full load in 40 minutes.</p>
                                <button className='get-btn'>Get It Now</button>
                            </div>
                        </div>
                        <div className="carousel-item food">
                            <div className="carousel-caption">
                                <h3>Hurry up!<br />American FastFood<br />Everyday</h3>
                                <p>Enjoy a variety of American fast foods<br />with great deals every day.</p>
                                <button className='get-btn'>Get It Now</button>
                            </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#demo" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#demo" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
                <div className='product-div col-lg-4 col-12 d-flex flex-wrap'>
                    <div className='lap-div col-lg-12 col-12'>
                        <p className='p1'>Featured Products<br></br>Big Sale Up To 40% Off,</p>
                        <p className='p2'>Laptop, Tablet & Accessories</p>
                    </div>
                    <div className='earphone-div col-lg-12 col-12'>
                        <p className='p1'>Hot Deals Of The Week<br></br>Best Quality Of Music</p>
                        <p className='p2'>Free Shipping 60Km</p>
                    </div>
                    <div className='qled-div col-lg-12 col-12'>
                        <p className='p1'>Featured Products<br></br>Big Sale Up To 40% Off,</p>
                        <p className='p2'>Laptop, Tablet & Accessories</p>
                    </div>
                </div>
            </div>
            <div className='item-container d-flex'>
                <div className='free-shipping col-lg-3 col-sm-6 col-12 d-flex'>
                    <div>
                        <i className="fa-solid fa-rocket text-dark"></i>
                    </div>
                    <div>
                        <h4 className='heading3 text-dark'>Free Shipping</h4>
                        <p className='p3 text-dark'>Free Shipping On All Order</p>
                    </div>
                </div>
                <div className='money-guarantee col-lg-3 col-sm-6 col-12 d-flex'>
                    <div>
                        <i className="fa-solid fa-rotate"></i>
                    </div>
                    <div>
                        <h4 className='heading3'>Money Guarantee</h4>
                        <p className='p3'>30 Day Money Back Guarantee</p>
                    </div>
                </div>
                <div className='online-suuport col-lg-3 col-sm-6 col-12 d-flex'>
                    <div>
                    <i className="fa-regular fa-user user1"></i>
                    </div>
                    <div>
                        <h4 className='heading3'>Online Support 24/7</h4>
                        <p className='p3'>Technical Support 24/7</p>
                    </div>
                </div>
                <div className='discount1 col-lg-3 col-sm-6 col-12 d-flex'>
                    <div>
                        <i className="fa-solid fa-tags"></i>
                    </div>
                    <div>
                        <h4 className='heading3'>Member Discount</h4>
                        <p className='p3'>Upto 40% Discount All Products</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
