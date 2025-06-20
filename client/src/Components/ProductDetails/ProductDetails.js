import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../Header/Header';
import "./ProductDetails.css";
import Footer from '../Footer/Footer';
import CartModal from '../CartModal/CartModal';
import { apiList } from '../../services/apilist';

const server = "http://localhost:4445";

export default function ProductDetails(props) {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [productDetails, setProductDetails] = useState([]);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [lensStyle, setLensStyle] = useState({ display: 'none' });
  const [endDate, setEndDate] = useState(new Date());
  const [timeLeft, setTimeLeft] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Description');
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);
  const prevProductRef = useRef();
  const [similarProducts, setSimilarProducts] = useState([])

  const { cartItems, totalAmount, isModalOpen, removeFromCart, handleAddToCart, closeModal, handleIncrease, handleDecrease, TopDeals, OnsaleProducts, RecommendedProducts, toggleCartModal, openModal } = props;

  // Fetch product details from the API
  useEffect(() => {
    const fetchProductDetailsAndAllProducts = async () => {
      try {
        // Fetch specific product details
        const productResponse = await fetch(`${server}/api/product/${productId}`);
        if (!productResponse.ok) {
          throw new Error(`Error: ${productResponse.statusText}`);
        }
        const productData = await productResponse.json();
        const fetchedProduct = productData.data[0];
        setProduct(fetchedProduct);

        // Fetch all product details
        const allProductsResponse = await fetch(apiList.allProductDetails);
        if (!allProductsResponse.ok) {
          throw new Error(`Error: ${allProductsResponse.statusText}`);
        }
        const allProductsData = await allProductsResponse.json();
        setProductDetails(allProductsData.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError(error.message);
      }
    };

    fetchProductDetailsAndAllProducts();
  }, [productId]);

  // Update product based on productDetails
  // useEffect(() => {
  //   const foundProduct = productDetails.find(p => p._id === parseInt(productId));
  //   setProduct(foundProduct || null);
  // }, [productDetails, productId]);

  // console.log(productDetails);

  useEffect(() => {
    if (product) {
      const newEndDate = new Date();
      newEndDate.setDate(newEndDate.getDate() + (product.daysleft || 0));
      setEndDate(newEndDate);
      setMainImage(product.imageUrl);
    }
  }, [product]);

  useEffect(() => {
    if (endDate) {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(endDate));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [endDate]);

  // Function to calculate time left
  const calculateTimeLeft = (endDate) => {
    const now = new Date();
    const timeLeft = endDate - now;

    return {
      days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
      hours: Math.floor((timeLeft / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((timeLeft / 1000 / 60) % 60),
      seconds: Math.floor((timeLeft / 1000) % 60),
    };
  };

  // Handle image zoom lens
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const lensRadius = 100;
    let x = e.clientX - left;
    let y = e.clientY - top;

    if (x < lensRadius) x = lensRadius;
    if (x > width - lensRadius) x = width - lensRadius;
    if (y < lensRadius) y = lensRadius;
    if (y > height - lensRadius) y = height - lensRadius;

    setLensStyle({
      display: 'block',
      left: `${x - lensRadius}px`,
      top: `${y - lensRadius}px`,
      backgroundPosition: `-${(x * 2) - lensRadius}px -${(y * 2) - lensRadius}px`,
      backgroundSize: `${width * 2}px ${height * 2}px`,
    });
  };

  const handleMouseLeave = () => {
    setLensStyle({ display: 'none' });
  };

  // Handle quantity increase and decrease
  const handleQuantityIncrease = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleQuantityDecrease = () => {
    if (product && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };


  const handleImageClick = (imageUrl) => {
    setMainImage(imageUrl);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };



  // Filter similar products
  const doesTitleContainWord = (title, word) => {
    return title.toLowerCase().split(' ').some(t => t.includes(word.toLowerCase()));
  };

  // Check if 'product' is not null before filtering
  useEffect(() => {
    if (product && productDetails.length > 0) {
      const filteredProducts = productDetails.filter(p => {
        if (!product) return false;
        const productTitleWords = product.title.split(' ');
        return productTitleWords.some(word => doesTitleContainWord(p.title, word)) && p._id !== product._id;
      });
      setSimilarProducts(filteredProducts);
    }
  }, [product, productDetails]);

  const visibleProducts = similarProducts.slice(startIndex, endIndex);

  // console.log('similarProducts', similarProducts);
  // console.log('visibleProducts', visibleProducts);


  // Handle pagination
  const handlePrevClick = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
      setEndIndex(endIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (endIndex < similarProducts.length) {
      setStartIndex(startIndex + 1);
      setEndIndex(endIndex + 1);
    }
  };

  // Manage recently viewed products
  useEffect(() => {
    if (product && prevProductRef.current !== product) {
      if (!recentlyViewedProducts.some(item => item._id === product._id)) {
        setRecentlyViewedProducts((prevItems) => {
          const updatedItems = [product, ...prevItems];
          return updatedItems.slice(0, 5);
        });
      }
      prevProductRef.current = product;
    }
  }, [product, recentlyViewedProducts]);

  if (error) {
    return <div>Failed to fetch product details: {error}</div>;
  }

  if (productDetails.length === 0) {
    return (
      <div className='spinner-loader'>
        <div className='spinner'></div>
      </div>
    )
  }

  if (!product) {
    return <div>Product Not Found</div>;
  }

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
      <div className='product-details-div'>
        <div className='back-to-home'>
          <Link to="/" className='back-to-home-link'><p>Home</p></Link>
          <p className='back-to-home-text text-secondary'>&nbsp; / {product.title}</p>
        </div>
        <hr className='product-details-hr' />
        <div className='product-image-details-div d-flex flex-wrap'>
          <div className='product-images col-lg-6 col-md-6 col-12 d-flex'>
            <div className='display-image col-lg-10'>
              <div
                className='image-zoom-container'
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <img src={mainImage} className='display-image1' alt={product.title} />
                <div
                  className="zoom-lens"
                  style={{ ...lensStyle, backgroundImage: `url(${mainImage})` }}
                ></div>
              </div>
            </div>
            <div className='display-image-list col-lg-2'>
              <img
                src={product.imageUrl}
                className='display-image2'
                onClick={() => handleImageClick(product.imageUrl)}
                alt={product.title}
              />
              <img
                src={product.imageHoverUrl}
                className='display-image2'
                onClick={() => handleImageClick(product.imageHoverUrl)}
                alt={product.title}
              />
            </div>
          </div>
          <div className='product-details col-lg-6 col-md-6 col-sm-12'>
            <h1>{product.title}</h1>
            <div className="stars1">
              {'★'.repeat(5)}
              <span className="reviews1">( {product.review} reviews )</span>
            </div>
            <hr />
            <div className="price1">£ {product.price.toFixed(2)}</div>
            {product.discount && <p className='details-discount'>Discount £ {parseInt(product.discount).toFixed(2)}</p>}
            <ul className='specs1'>
              <li><span className='dot1'>.</span> {product.screen}</li>
              <li><span className='dot1'>.</span> {product.os}</li>
              <li><span className='dot1'>.</span> {product.inches}</li>
            </ul>
            <div className='live-view d-flex align-items-center'>
              <i className="fa-regular fa-eye"></i>
              <p className='eye-text'>22 People are viewing this page</p>
            </div>
            <div className='countdown1 d-flex justify-content-between mt-5 align-items-center'>
              <div className='hurry-up-div1'>
                <p className='hurry-text'>Hurry up! Sale ends in:</p>
              </div>
              <div className='d-flex time-div justify-content-around '>
                <div className='days1 d-flex align-items-center justify-content-between'>
                  <p className='count-down-time'>{timeLeft.days}</p><sub className='count-down-text'>days</sub>
                </div>
                <div className='hours1 d-flex align-items-center'>
                  <p className='count-down-time'>{timeLeft.hours}</p><sub className='count-down-text'>hours</sub>
                </div>
                <div className='mins1 d-flex align-items-center'>
                  <p className='count-down-time'>{timeLeft.minutes}</p><sub className='count-down-text'>mins</sub>
                </div>
                <div className='secs1 d-flex align-items-center'>
                  <p className='count-down-time'>{timeLeft.seconds}</p><sub className='count-down-text'>secs</sub>
                </div>
              </div>
            </div>
            <div className='stock-left'>
              <p className='hurry-up-text'>Hurry Up! Only<span className='text-warning'> {product.stock} </span>Left in Stock!</p>
            </div>
            <div className='add-to-cart-btn-div1 d-flex'>
              <div className='increase-decrease-div d-flex'>
                <button className='decreaseBtn1' onClick={handleQuantityDecrease}>-</button>
                <p className='count1'>{quantity.toString().padStart(2, '0')}</p>
                <button className='increaseBtn1' onClick={handleQuantityIncrease}>+</button>
              </div>
              <div className='add-to-cart-btn'>
                <button className='add-to-cart-btn1' onClick={() => handleAddToCart(product)}>ADD TO CART</button>
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
              </div>
            </div>
            <div className='terms1 d-flex align-items-center'>
              <input type='checkbox' className='mr-2'></input>
              <p className='para1'>I agree with The <a href='#' className='terms-link'> terms and conditions</a></p>
            </div>
            <button className='buy-shop-btn1 bg-primary'>Buy with Shop Pay</button>
            <div className='share-div d-flex justify-content-between'>
              <div className='wish-add-div d-flex'>
                <div className='wish-div1 d-flex align-items-center'>
                  <i className="fa-regular fa-heart product-heart"></i>
                  <p className='share-text'>Add Wishlist</p>
                </div>
                <div className='add-div1 d-flex align-items-center'>
                  <i className="fa-solid fa-database"></i>
                  <p className='share-text'>Add compare</p>
                </div>
              </div>
              <div className='share1 d-flex align-items-center'>
                <i className="fa-solid fa-share-nodes"></i>
                <p className='share-text'>Share</p>
              </div>
            </div>
            <hr></hr>
            <div className='shipping-contact-div d-flex justify-content-between'>
              <div className='shipping-return-div d-flex align-items-center'>
                <i className="fa-solid fa-shield "></i>
                <p className='shipping-text'>Shipping and Returns</p>
              </div>
              <div className='Contact-div d-flex align-items-center'>
                <i className="fa-regular fa-envelope"></i>
                <p className='shipping-text'>Contact us</p>
              </div>
            </div>
            <div className='estimated-delivery d-flex align-items-center'>
              <i className="fa-solid fa-truck-ramp-box"></i>
              <p className='shipping-text'>Estimated Delivery: {product.delivery && <span className='text-dark'>{product.delivery}</span>}</p>
            </div>
            <div className='return-days d-flex align-items-center'>
              <i className="fa-solid fa-recycle"></i>
              <p className='shipping-text'>Return With in <span className='text-dark'> 30 days </span> of purchase. Taxes are non-refundable.</p>
            </div>
            <hr></hr>
            <div className='stock-avalibality d-flex'>
              <div className='mr-4'>
                <p className='stock-avalibality-text'>Availability :</p>
                <p className='stock-avalibality-text'>SKU:</p>
                <p className='stock-avalibality-text'>Vendor:</p>
                <p className='stock-avalibality-text'>Categories:</p>
                <p className='stock-avalibality-text'>Tags:</p>
              </div>
              <div>
                <p className='product-avalibality-text text-success'>{product.avalibility}</p>
                <p className='product-avalibality-text'>{product.sku}</p>
                <p className='product-avalibality-text'>{product.vendor}</p>
                <p className='product-avalibality-text'>{product.categories}</p>
                <p className='product-avalibality-text'>{product.tags}</p>
              </div>
            </div>
            <div className='gurantee_safe d-flex flex-column justify-content-center align-items-center'>
              <p className='guarantee-text'>Guarantee safe & Secure checkout</p>
              <div className='ecommerce-image'>
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
        </div>
      </div>
      <div className='tabs-div1 mt-5'>
        <div className='description-div d-flex justify-content-center'>
          {['Description', 'Additional Information', 'Shipping & Return', 'Reviews'].map((tab, index) => (
            <p
              key={index}
              onClick={() => handleTabClick(tab)}
              className={`tab-heading ${activeTab === tab ? 'active-tab' : ''}`}
            >
              {tab}
            </p>
          ))}
        </div>
        <hr className='product-details-hr1'></hr>
        <div className='description-text'>
          {activeTab === 'Description' &&
            <div className='description-div1'>
              <p className='product-description-text'>{product.description.title}</p>
              <h2 className='product-workwonders-heading'>WORK WONDERS WITH EASE</h2>
              <p className='product-workwonders-text'>{product.description.workwonders}</p>
              <h2 className='product-quality-heading'>PRODUCT SUPREME QUALITY</h2>
              <p className='product-quality-text'>{product.description.productQuality}</p>
            </div>}
          {activeTab === 'Additional Information' &&
            <div className='additional-information d-flex ml-5'>
              <table className="additional-information">
                <tbody>
                  <tr className="row">
                    <td className="info d-flex">
                      <div className="info-title">Color</div>
                      <div className="info-value ">{product.additionalInformation.Color}</div>
                    </td>
                  </tr>
                  <tr className="row">
                    <td className="info d-flex">
                      <div className="info-title">Product Type</div>
                      <div className="info-value ">{product.additionalInformation.Product_Type}</div>
                    </td>
                  </tr>
                  <tr className="row">
                    <td className="info d-flex">
                      <div className="info-title">Storage</div>
                      <div className="info-value ">{product.additionalInformation.Storage}</div>
                    </td>
                  </tr>
                  <tr className="row">
                    <td className="info d-flex">
                      <div className="info-title">Brand</div>
                      <div className="info-value ">{product.additionalInformation.Brand}</div>
                    </td>
                  </tr>
                  <tr className="row">
                    <td className="info d-flex">
                      <div className="info-title">Display</div>
                      <div className="info-value ">{product.additionalInformation.Display}</div>
                    </td>
                  </tr>
                  <tr className="row">
                    <td className="info d-flex">
                      <div className="info-title">Capacity</div>
                      <div className="info-value ">{product.additionalInformation.Capacity}</div>
                    </td>
                  </tr>
                  <tr className="row">
                    <td className="info d-flex">
                      <div className="info-title">Chip (CPU)</div>
                      <div className="info-value ">{product.additionalInformation.Chip}</div>
                    </td>
                  </tr>
                  <tr className="row">
                    <td className="info d-flex">
                      <div className="info-title">Camera and Video</div>
                      <div className="info-value ">{product.additionalInformation.Camera}</div>
                    </td>
                  </tr>
                  <tr className="row">
                    <td className="info d-flex">
                      <div className="info-title">Front Camera</div>
                      <div className="info-value ">{product.additionalInformation.Front_Camera}</div>
                    </td>
                  </tr>
                  <tr className="row">
                    <td className="info d-flex">
                      <div className="info-title">Battery Life</div>
                      <div className="info-value ">{product.additionalInformation.Battery_Life}</div>
                    </td>
                  </tr>
                  <tr className="row">
                    <td className="info d-flex">
                      <div className="info-title">In The Box</div>
                      <div className="info-value ">{product.additionalInformation.IntheBox}</div>
                    </td>
                  </tr>
                  <tr className="row">
                    <td className="info d-flex">
                      <div className="info-title">Height</div>
                      <div className="info-value ">{product.additionalInformation.Height}</div>
                    </td>
                  </tr>
                  <tr className="row">
                    <td className="info d-flex">
                      <div className="info-title">width</div>
                      <div className="info-value ">{product.additionalInformation.Width}</div>
                    </td>
                  </tr>
                  <tr className="row">
                    <td className="info d-flex">
                      <div className="info-title">Weight</div>
                      <div className="info-value ">{product.additionalInformation.Weight}</div>
                    </td>
                  </tr>
                  <tr className="row">
                    <td className="info d-flex">
                      <div className="info-title">Mobile Network</div>
                      <div className="info-value ">{product.additionalInformation.MobileNetwork}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>}
          {activeTab === 'Shipping & Return' &&
            <div className='ShippingReturn'>
              <h4 className='shipping-heading'>SHIPPING</h4>
              <p className='product-shipping-text'>{product.ShippingReturn.Shipping.one}</p>
              <p className='product-shipping-text'>{product.ShippingReturn.Shipping.two}</p>
              <p className='product-shipping-text'>{product.ShippingReturn.Shipping.three}</p>
              <p className='product-shipping-text'>{product.ShippingReturn.Shipping.four}</p>
              <p className='product-shipping-text'>{product.ShippingReturn.Shipping.five}</p>
              <h4 className='shipping-heading'>RETURNS AND EXCHANGES</h4>
              <p className='product-shipping-text'>{product.ShippingReturn.Return.one}</p>
              <p className='product-shipping-text'>{product.ShippingReturn.Return.two}</p>
            </div>}
          {activeTab === 'Reviews' &&
            <div className='d-flex justify-content-center align-items-center'>
              <div className='stars1 mr-4'>
                {'★'.repeat(5)}
              </div>
              <p>{product.review} reviews</p>
            </div>}
        </div>

      </div>
      <div className='similar-products'>
        <h2 className='related-heading'>Related Products</h2>
        <hr className='related-hr'></hr>
        <div className='pagination-container'>
          <button
            className='pagination-button prev-button'
            onClick={handlePrevClick}
            disabled={startIndex === 0}
          >
            &lt;
          </button>
          <div className='similar-products-list'>
            {visibleProducts.map((p) => (
              <div className="product-card3" key={p._id}>
                <div className='new1'>
                  {p.type && <div className="product-type">{p.type}</div>}
                  {p.sale && <div className="product-sale">{p.sale}</div>}
                  {p.discount && <div className="product-discount">-{p.discount}%</div>}
                </div>
                <div className="image-container2">
                  <Link to={`/product/${p._id}`}><img src={p.imageUrl} alt={p.title} className="product-image1" />
                    <img src={p.imageHoverUrl} alt={p.title} className="product-image-hover1" /></Link>
                </div>
                <Link to={`/product/${p._id}`} className='title-link'><h3 className="product-title3">{p.title}</h3></Link>
                <div className="stars1">
                  {'★'.repeat(5)}
                  <span className="reviews1">{p.review} reviews</span>
                </div>
                <div className="price1">£ {p.price.toFixed(2)}</div>
                <button className="add-to-cart1" onClick={() => handleAddToCart(p)}>Add to Cart</button>
              </div>
            ))}
          </div>
          <button
            className='pagination-button next-button'
            onClick={handleNextClick}
            disabled={endIndex >= similarProducts.length}
          >
            &gt;
          </button>
        </div>
      </div>
      <hr className='product-details-hr1'></hr>
      <div className='recent-products mt-5'>
        <h2 className='recernt-heading pb-3'>Recently Viewed Products</h2>
        <hr className='product-details-hr'></hr>
        <div className='mapping-div'>
          {recentlyViewedProducts.map((product) => (
            <div className="product-card3" key={product._id}>
              <div className='new1'>
                {product.type && <div className="product-type">{product.type}</div>}
                {product.sale && <div className="product-sale">{product.sale}</div>}
                {product.discount && <div className="product-discount">-{product.discount}%</div>}
              </div>
              <div className="image-container2">
                <Link to={`/product/${product._id}`}><img src={product.imageUrl} alt={product.title} className="product-image1" />
                  <img src={product.imageHoverUrl} alt={product.title} className="product-image-hover1" /></Link>
              </div>
              <Link to={`/product/${product._id}`} className='title-link'><h3 className="product-title3">{product.title}</h3></Link>
              <div className="stars1">
                {'★'.repeat(5)}
                <span className="reviews1">{product.review} reviews</span>
              </div>
              <div className="price1">£ {product.price.toFixed(2)}</div>
              <button className="add-to-cart1" onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
