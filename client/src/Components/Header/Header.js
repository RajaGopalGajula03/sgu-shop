import React, { useState, useEffect } from 'react';
import "./Header.css";
import LoginModal from '../LoginModal/LoginModal';
import CartModal from '../CartModal/CartModal';
import { Link } from 'react-router-dom';
import { apiList } from '../../services/apilist';
import Cookies from "js-cookie";
// import { useEffect } from 'react';

export default function Header(props) {
  const { cartItems, removeFromCart, totalAmount, handleIncrease, handleDecrease } = props;


  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("United States (USD $)");
  const [loginBtn, setLoginBtn] = useState('login');
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [ishamModalOpen,setHamModalOpen] = useState(false);


  // const toggleModal = () => setHamModalOpen(!ishamModalOpen);


  const languageFlags = {
    English: 'https://demo-morata.myshopify.com/cdn/shop/t/4/assets/flag_en.png?v=14076981825125011091700451475',
    Arab: 'https://demo-morata.myshopify.com/cdn/shop/t/4/assets/flag_ar.png?v=87171907108583701081700451470',
    Italiano: 'https://demo-morata.myshopify.com/cdn/shop/t/4/assets/flag_it.png?v=145339513251517899001700451475',
    Ελληνικά: 'https://demo-morata.myshopify.com/cdn/shop/t/4/assets/flag_el.png?v=163704008545148749451700451473',
    Deutsch: 'https://demo-morata.myshopify.com/cdn/shop/t/4/assets/flag_de.png?v=69801997571936479461700451474',
    Français: 'https://demo-morata.myshopify.com/cdn/shop/t/4/assets/flag_fr.png?v=69148847184916641131700451474'
  };

  const currencies = {
    "Canada (CAD $)": "Canada (CAD $)",
    "Japan (JPY ¥)": "Japan (JPY ¥)",
    "United Kingdom (GBP £)": "United Kingdom (GBP £)",
    "United States (USD $)": "United States (USD $)"
  };

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.getAttribute('data-value');
    setLanguage(selectedLanguage);
  };

  const handleCurrencyChange = (event) => {
    const selectedCurrency = event.target.getAttribute('data-value');
    setCurrency(selectedCurrency);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);


  const openSearchModal = () => setSearchModalOpen(true);
  const closeSearchModal = () => setSearchModalOpen(false);

  const handleSearchInputChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      // Open the search modal
      openSearchModal();

      try {
        // Fetch matching products from the productDetails collection
        const response = await fetch(apiList.products);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        const products = data.data;

        // Filter products based on the search query
        const results = products.filter(product =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(results);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    } else {
      setSearchResults([]);
      closeSearchModal();
    }
  };



  useEffect(() => {
    // Check if the authToken cookie is present
    const token = Cookies.get('authToken');
    setIsLoggedIn(!!token);
  }, []); // Empty dependency array to run only on component mount

  useEffect(() => {
    // Optionally: Add this effect if you want to log state changes or perform other actions
    // console.log(`Logged in: ${isLoggedIn}`);
  }, [isLoggedIn]);


  const handleLogout = () => {
    const isConfirmed = window.confirm('Are you sure you want to log out?');

    if (isConfirmed) {
      // Remove the authToken cookie
      Cookies.remove('authToken');

      // Update the login state
      setIsLoggedIn(false);

      // Close the login modal
      closeLoginModal();
    }
  };


  const handleCartClick = () => {
    if (isLoggedIn) {
      openModal();
    } else {
      alert("Please log in to view your cart.");
      openLoginModal();
    }
  };

  function toggleModal() {
    const modal = document.getElementById('modal1');
    if (modal.style.display === 'block') {
      modal.style.display = 'none';
    } else {
      modal.style.display = 'block';
    }
  }


  // function toggleMenu() {
  //   const menuItems = document.querySelector('.hamburger-menu .menu-items');
  //   menuItems.classList.toggle('show');
  // }



  return (
    <div className='main-div'>
      <nav className='container-fluid navbar navbar-expand-md'>
        <div className='top-nav'>
          <div className='about-nav'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <a className='nav-link' href='#'>About Us</a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='#'>Order Tracking</a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='#'>Contact Us</a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='#'>FAQs</a>
              </li>
            </ul>
          </div>
          <div className='signup-nav' data-toggle="modal" data-target="#myModal">
            Sign up for 10% off your first order :
            <a className='nav-link' href='#' onClick={() => {
              setLoginBtn('Register');
              if (isLoggedIn) {
                setLoginModalOpen(false);
                alert("User already loggedin \n change to another user logout first")
              }
              else {
                setLoginModalOpen(true);
              }
            }}>Sign Up</a>
          </div>

          <div className='language-nav'>
            <div className='language-list'>
              <ul className='navbar-nav'>
                <li className='nav-item dropdown'>
                  <a className='nav-link dropdown-toggle' href='#' data-toggle="dropdown">
                    <img className='language-image1' src={languageFlags[language]} alt={language} /> {language}
                  </a>
                  <div className='dropdown-menu'>
                    {Object.entries(languageFlags).map(([lang, url]) => (
                      <a
                        key={lang}
                        className='dropdown-item'
                        href='#'
                        data-value={lang}
                        onClick={handleLanguageChange}
                      >
                        <img src={url} alt={lang} className='language-image' /> {lang}
                      </a>
                    ))}
                  </div>
                </li>
                <li className='nav-item dropdown'>
                  <a className='nav-link dropdown-toggle' href='#' data-toggle="dropdown">
                    {currency}
                  </a>
                  <div className='dropdown-menu'>
                    {Object.entries(currencies).map(([key, value]) => (
                      <a
                        key={key}
                        className='dropdown-item'
                        href='#'
                        data-value={key}
                        onClick={handleCurrencyChange}
                      >
                        {value}
                      </a>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <hr></hr>
      <nav className='container-fluid navbar navbar-expand-md'>
        <div className='middle-nav'>
          <div className="hamburger" onClick={toggleModal}>
            &#9776;
          </div>
          <div className="modal1" id="modal1">
            <div className="modal-content1">
              <span className="close1" onClick={toggleModal}>Close &times;</span>
              <p className='hamburgur-title'>WHAT ARE YOU LOOKING FOR</p>
              <div className="search-bar1">
                <input className='search-bar2' type="text" placeholder="Search..." />
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <div className="auth-links">
                <i className="fa-solid fa-user-group users-group"></i>
                <a className='nav-link1' href='#' onClick={() => {
                  setLoginBtn('Register');
                  if (isLoggedIn) {
                    setLoginModalOpen(false);
                    alert("User already loggedin \n change to another user logout first")
                  }
                  else {
                    setLoginModalOpen(true);
                  }
                }}><p className='middle-nav-text2'>Register</p></a><span className='splash'>/</span>
                <a className='nav-link1' href='#' onClick={() => {
                  setLoginBtn('login');
                  if (isLoggedIn) {
                    handleLogout();
                  }
                  else {
                    setLoginModalOpen(true)
                  }
                }}><p className='middle-nav-text2'>{isLoggedIn ? 'Logout' : "Login"}</p></a>
              </div>
              <div className="nav-links d-flex flex-column">
                <hr className='hr1'></hr>
                <a href="#home" className='nav-links-1'>Home</a>
                <hr className='hr1'></hr>
                <a href="#shop" className='nav-links-1'>Shop</a><hr className='hr1'></hr>
                <a href='#' className='nav-links-1'>Page</a><hr className='hr1'></hr>
                <a href='#' className='nav-links-1'> Blog</a> <hr className='hr1'></hr>
                <a href='#' className='nav-links-1'>Wishlist</a> <hr className='hr1'></hr>
                <a href='#' className='nav-links-1'>compare</a><hr className='hr1'></hr>
                <a href='#' className='nav-links-1'>Contact Us</a><hr className='hr1'></hr>
              </div>
            </div>
          </div>
          <div className='logo-image'>
            <Link to="/"><img src='https://res.cloudinary.com/dhpkv1tec/image/upload/v1722513876/natural%20places/SGU_SHOP_LOGO_TRANSPARENT_lxgqrq.png' className='logo-image' alt='sgu-logo'></img></Link>
          </div>
          <div className='middle-div'>
            <div className='category-div'>
              <select className='category-list'>
                <option>All Categories</option>
                <option>Accessories</option>
                <option>Basketball</option>
                <option>Clothing</option>
                <option>Computer</option>
                <option>Computer & Desktop</option>
                <option>Electronics</option>
                <option>Jewelry</option>
                <option>Laptop</option>
                <option>Laptop & Ipad</option>
              </select>
            </div>
            <div className='search-div'>
              <input className='search-input'
                type='search'
                placeholder=' &nbsp;&nbsp;Search for products...'
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
              <button className='search-btn'>Search</button>
            </div>
            {isSearchModalOpen && (
              <div className='search-modal'>
                <div className='search-modal-content'>
                  <button className='search-modal-close' onClick={closeSearchModal}>×</button>
                  {searchResults.length > 0 ? (
                    searchResults.map(product => (
                      <div key={product._id} className='search-result-item d-flex'>
                        <div className='mr-3'>
                          <Link to={`/product/${product._id}`}><img src={product.imageUrl} alt={product.title} className='search-result-image' /></Link>
                        </div>
                        <div>
                          <Link to={`/product/${product._id}`}><p className='search-result-title'>{product.title}</p></Link>
                          <p className='price3'> £ {product.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No products found.</p>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className='right-div'>
            <div className='login-div d-flex align-items-center mr-3' data-toggle="modal" data-target="#myModal" data-placement="bottom" title="Login" onClick={() => {
              setLoginBtn('login');
              if (isLoggedIn) {
                handleLogout();
              }
              else {
                setLoginModalOpen(true)
              }
            }}>
              <i className="fa-regular fa-user"></i>
              <div className='login-text'>
                <p className='middle-nav-text'>{isLoggedIn ? 'Logout' : "Login"}<br></br>
                  <span className='middle-nav-text1'>Account</span></p>
              </div>
            </div>
            {isLoginModalOpen && <LoginModal loginBtn={loginBtn} setLoginBtn={setLoginBtn} closeLoginModal={closeLoginModal} setLoginModalOpen={setLoginModalOpen} setIsLoggedIn={setIsLoggedIn} />}
            <div className='wishlist-div d-flex align-items-center mr-3' data-toggle="tooltip" data-placement="bottom" title="My Wishlist">
              <i className="fa-regular fa-heart"><sup className='super'>0</sup></i>
              <div className='wishlist-text'>
                <p className='middle-nav-text'>Favorite<br></br>
                  <span className='middle-nav-text1'>My wishlist</span></p>
              </div>
            </div>
            <div className='cart-div d-flex justify-content-center align-items-center mr-3' data-toggle="tooltip" data-placement="bottom" title="Your Cart" onClick={handleCartClick}>
              <i className="fa-solid fa-cart-shopping"><sup className='super'>{cartItems.length}</sup></i>
              <div className='cart-text'>
                <p className='middle-nav-text'>Your Cart<br></br>
                  <span className='middle-nav-text1'>£ {totalAmount.toFixed(2)}</span></p>
              </div>
            </div>
            {isModalOpen && <CartModal cartItems={cartItems} removeFromCart={removeFromCart} onClose={closeModal} handleIncrease={handleIncrease} handleDecrease={handleDecrease} totalAmount={totalAmount} />}
          </div>
          <div className='min-cart-div' onClick={handleCartClick}>
            <i className="fa-solid fa-cart-shopping"><sup className='super'>{cartItems.length}</sup></i>
          </div>
        </div>
        {isModalOpen && <CartModal cartItems={cartItems} removeFromCart={removeFromCart} onClose={closeModal} handleIncrease={handleIncrease} handleDecrease={handleDecrease} totalAmount={totalAmount} />}
      </nav>
      <hr></hr>
      <nav className='container-fluid navbar navbar-expand-md'>
        <div className='bottom-nav'>
          <div className="click d-flex flex-row align-items-center">
            <div className='select-div mr-3'>
              <select>
                <option>Shop By Department</option>
                <option>Computer & Desktop</option>
                <option>Laptop & Ipad</option>
                <option>Cameras & Photos</option>
                <option>Smart Phones & Tablets</option>
                <option>Home & Kitchen</option>
                <option>TV & Audios</option>
                <option>Health & Beauty</option>
                <option>Top Deals</option>
              </select>
            </div>
            <div className='home-nav'>
              <div className='home-div'>
                <ul className='navbar-nav'>
                  <li className='nav-item dropdown'>
                    <a className='nav-link dropdown-toggle text-white-2' href='#' data-toggle="dropdown">
                      HOME
                    </a>
                    <div className='dropdown-menu menu1'>
                      <a href="#">Home 1</a>
                      <a href="#">Home 2</a>
                      <a href="#">Home 3</a>
                      <a href="#">Home 4</a>
                      <a href="#">Home 5</a>
                      <a href="#">Home 6</a>
                      <a href="#">Home 7</a>
                      <a href="#">Home 8</a>
                      <a href="#">Home 9</a>
                      <a href="#">Home 10</a>
                    </div>
                  </li>
                  <li className='nav-item dropdown'>
                    <a className='nav-link dropdown-toggle text-white-2' href='#' data-toggle="dropdown">
                      SHOP
                    </a>
                    <div className='dropdown-menu menu1'>
                      <a href="#">Home 1</a>
                      <a href="#">Home 2</a>
                      <a href="#">Home 3</a>
                      <a href="#">Home 4</a>
                      <a href="#">Home 5</a>
                      <a href="#">Home 6</a>
                      <a href="#">Home 7</a>
                      <a href="#">Home 8</a>
                      <a href="#">Home 9</a>
                      <a href="#">Home 10</a>
                    </div>
                  </li>
                  <li className='nav-item dropdown'>
                    <a className='nav-link dropdown-toggle text-white-2' href='#' data-toggle="dropdown">
                      PRODUCT
                    </a>
                    <div className='dropdown-menu menu1'>
                      <a href="#">Home 1</a>
                      <a href="#">Home 2</a>
                      <a href="#">Home 3</a>
                      <a href="#">Home 4</a>
                      <a href="#">Home 5</a>
                      <a href="#">Home 6</a>
                      <a href="#">Home 7</a>
                      <a href="#">Home 8</a>
                      <a href="#">Home 9</a>
                      <a href="#">Home 10</a>
                    </div>
                  </li>
                  <li className='nav-item dropdown'>
                    <a className='nav-link dropdown-toggle text-white-2' href='#' data-toggle="dropdown">
                      PAGES
                    </a>
                    <div className='dropdown-menu menu1'>
                      <a href="#">Home 1</a>
                      <a href="#">Home 2</a>
                      <a href="#">Home 3</a>
                      <a href="#">Home 4</a>
                      <a href="#">Home 5</a>
                      <a href="#">Home 6</a>
                      <a href="#">Home 7</a>
                      <a href="#">Home 8</a>
                      <a href="#">Home 9</a>
                      <a href="#">Home 10</a>
                    </div>
                  </li>
                  <li className='nav-item dropdown'>
                    <a className='nav-link dropdown-toggle text-white-2' href='#' data-toggle="dropdown">
                      BLOG
                    </a>
                    <div className='dropdown-menu menu1'>
                      <a href="#">Home 1</a>
                      <a href="#">Home 2</a>
                      <a href="#">Home 3</a>
                      <a href="#">Home 4</a>
                      <a href="#">Home 5</a>
                      <a href="#">Home 6</a>
                      <a href="#">Home 7</a>
                      <a href="#">Home 8</a>
                      <a href="#">Home 9</a>
                      <a href="#">Home 10</a>
                    </div>
                  </li>
                  <li className='nav-item'>
                    <a className='nav-link text-white-2' href='#'>
                      CONTACT US
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className='hot-line-div'>
            <i className="fa-regular fa-bell"></i>
            Hotline: (+100) 123 456 7890
          </div>
        </div>
        <div className='bottom-nav-1'>
          <div className='search-div1'>
            <input className='search-input'
              type='search'
              placeholder=' &nbsp;&nbsp;Search for products...'
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <button className='search-btn1'>Search</button>
          </div>
        </div>
      </nav>
    </div>
  );
}
