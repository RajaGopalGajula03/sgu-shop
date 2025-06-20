import React, { useState, useEffect } from 'react';
import "./Topdeals.css";
import { Link } from 'react-router-dom';

export default function Topdeals(props) {
  const { TopDeals, onAddToCart } = props;

  const calculateTimeLeft = (endTime) => {
    const now = new Date();
    const timeLeft = endTime - now;

    return {
      days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
      hours: Math.floor((timeLeft / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((timeLeft / 1000 / 60) % 60),
      seconds: Math.floor((timeLeft / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(() => {
    if (TopDeals && TopDeals.length > 0) {
      return TopDeals.map((deal) => {
        const endTime = new Date();
        endTime.setDate(endTime.getDate() + deal.daysleft);
        return calculateTimeLeft(endTime);
      });
    }
    return [];
  });


  useEffect(() => {
    if (TopDeals && TopDeals.length > 0) {
      const endTimeList = TopDeals.map((deal) => {
        const endTime = new Date();
        endTime.setDate(endTime.getDate() + deal.daysleft);
        return endTime;
      });

      const timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          return endTimeList.map((endTime, index) => {
            if (endTime) {
              return calculateTimeLeft(endTime);
            } else {
              return { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }
          });
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [TopDeals]);



  if (!TopDeals || TopDeals.length === 0) {
    return (
      <div className='spinner-loader'>
        <div className='spinner'></div>
      </div>
    )
  }

  return (
    <div className='top-deals col-12 col-lg-12'>
      <h2 className='deals-heading'>Top Deals Of The Day</h2>
      <hr></hr>
      {TopDeals.map((item, index) => (
        <div className='item-card' key={item._id}>
          <div className='discount2'>-{item.discount}%</div>
          <div className='image-container'>
            <Link to={`/product/${item._id}`}>
              <img src={item.imageUrl} alt={item.title} className='deal-image' />
              <img src={item.imageHoverUrl} alt={item.title} className='deal-image-hover' />
            </Link>
          </div>
          <div className='specifications'>
            <Link to={`/product/${item._id}`} className='product-title-link'><h3 className='item-title'>{item.title}</h3></Link>
            <div className='stars'>
              {'★'.repeat(5)}
              <span className='reviews'>({item.review} reviews)</span>
            </div>
            <div className='price'>£ {item.price.toFixed(2)}</div>
            <ul className='specs'>
              <li><span className='dot'>.</span> {item.screen}</li>
              <li><span className='dot'>.</span>{item.os}</li>
              <li><span className='dot'>.</span> {item.inches}</li>
            </ul>
            <div className='countdown d-flex justify-content-around mt-5'>
              <div className='days'>
                {timeLeft[index]?.days || '0'}<br /> days
              </div>
              <div className='hours'>
                {timeLeft[index]?.hours || '0'}<br /> hours
              </div>
              <div className='mins'>
                {timeLeft[index]?.minutes || '0'} <br />mins
              </div>
              <div className='secs'>
                {timeLeft[index]?.seconds || '0'}<br /> secs
              </div>
            </div>
            <div className="w3-light-grey">
              <div id="myBar" className="w3-container w3-center" style={{ width: item.sold + '%' }}></div>
            </div>
            <div className='sold'>Sold :<span className='percentage'> {item.sold}/100 </span> Products</div>
            <button className='add-to-cart' onClick={() => onAddToCart(item)}>Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
}
