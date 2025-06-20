import React from 'react';
import './BestSelling.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function BestSelling(props) {

  const { OnSaleProducts, onAddToCart } = props;

  
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);

  const handlePrevClick = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
      setEndIndex(endIndex - 1);
    }
  };

  // Function to handle next button click
  const handleNextClick = () => {
    if (endIndex < OnSaleProducts.length) {
      setStartIndex(startIndex + 1);
      setEndIndex(endIndex + 1);
    }
  };

  const OnsaleVisibleProducts = OnSaleProducts.slice(startIndex, endIndex);
  if (!OnSaleProducts || OnSaleProducts.length === 0) {
    return(
      <div className='spinner-loader'>
        <div className='spinner'></div>
      </div>
    )
  }

  return (
    <div className="on-sale-products">
      <div className='onsale-title'>
        <div className='heading-onsale'>
          <h3>Best Selling TV - Audio</h3>
        </div>
        <div className='types'>
          <a href='#'>Phones & Tablets</a>
          <a href='#'>Computer & Laptop</a>
          <a href='#'>Games & Audio Music</a>
        </div>
      </div>
      <hr></hr>
      <div className='pagination-container'>
        <button
          className='pagination-button prev-button'
          onClick={handlePrevClick}
          disabled={startIndex === 0}
        >
          &lt;
        </button>
        <div className='similar-products-list'>
          {OnsaleVisibleProducts.map((product) => (
            <div className="product-card" key={product._id}>
              <div className='new'>
                {product.type && <div className="product-type">{product.type}</div>}
                {product.sale && <div className="product-sale">{product.sale}</div>}
                {product.discount && <div className="product-discount">-{product.discount}%</div>}
              </div>
              <div className="image-container1">
                <Link to={`/product/${product._id}`}><img src={product.imageUrl} alt={product.title} className="product-image" />
                  <img src={product.imageHoverUrl} alt={product.title} className="product-image-hover" /></Link>
              </div>
              <Link to={`/product/${product._id}`} className='title-link'><h3 className="product-title">{product.title}</h3></Link>
              <div className="stars">
                {'★'.repeat(5)}
                <span className="reviews">{product.review} reviews</span>
              </div>
              <div className="price">£ {product.price.toFixed(2)}</div>
              <button className="add-to-cart" onClick={() => onAddToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
        <button
          className='pagination-button next-button'
          onClick={handleNextClick}
          disabled={endIndex >= OnSaleProducts.length}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
