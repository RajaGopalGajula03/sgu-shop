import React from 'react';
import "./ShopByCategories.css";
import { useRef,useEffect } from 'react';


export default function ShopByCategories(props) {
    const {ShopByCategory} = props;

    const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let scrollInterval;

    if (container) {
      scrollInterval = setInterval(() => {
        const firstItemWidth = container.querySelector('.category-div1').offsetWidth;
        container.scrollBy({
          left: firstItemWidth,
          behavior: 'smooth'
        });

        // Reset scroll position if end is reached
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
          container.scrollLeft = 0;
        }
      }, 3000); // Change item every 3 seconds

      // Cleanup interval on component unmount
      return () => clearInterval(scrollInterval);
    }
  }, []);


  return (
    <div className='shopby-category' ref={containerRef}>
        <h4 className='shop-heading'>Shop By Categories</h4>
        <hr></hr>
      {ShopByCategory.map((category)=>(
        <div key={category.id} className='category-div1'>
            <img className='shop-image' src={category.shop_image} alt={category.shop_title}></img>
            <p className='shop-title'>{category.shop_title}</p>
            <div className='list-names'>
                {category.categories.map((list,index)=>(
                    <a href="#" className='list' key={`${category.id}-${index}`}>{list}</a>
                ))}
            </div>
        </div>
      ))}
    </div>
  )
}
