import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import './MyOrders.css';
import packagingAnimation from '../animation12.gif';
import greenTickGif from '../greentick.gif';
import dispatchGif from '../dispatch.gif';
import delivery1 from '../delivery1.jpg';
import delivery2 from '../delivery2.jpg';
import delivery3 from '../delivery3.jpg';
import delivery4 from '../delivery4.jpg';
import delivery5 from '../delivery5.jpg';

function MyOrders({ orders }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentDeliveryImage, setCurrentDeliveryImage] = useState(0);
  const sliderRef = useRef(null);
  
  const deliveryImages = [delivery1, delivery2, delivery3, delivery4, delivery5];

  useEffect(() => {
    gsap.fromTo('.order-card',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
    );
  }, [orders]);

  // Auto-cycle delivery images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDeliveryImage((prev) => (prev + 1) % 5);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const handleViewJourney = (order) => {
    setSelectedOrder(order);
    setCurrentSlide(0);
    
    // Animate journey viewer entrance
    setTimeout(() => {
      gsap.fromTo('.journey-viewer',
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      
      gsap.fromTo('.journey-slider-container',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' }
      );

      animateCurrentSlide(0);
    }, 10);
  };

  const animateCurrentSlide = (slideIndex) => {
    gsap.fromTo(`.journey-slide:nth-child(${slideIndex + 1}) .slide-content`,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
    );

    gsap.fromTo(`.journey-slide:nth-child(${slideIndex + 1}) .slide-animation`,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.7, delay: 0.2, ease: 'back.out(1.5)' }
    );

    gsap.fromTo(`.journey-slide:nth-child(${slideIndex + 1}) .slide-details .detail-card`,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, delay: 0.35, ease: 'power2.out' }
    );
  };

  const handleNextSlide = () => {
    if (currentSlide < 4) {
      const newSlide = currentSlide + 1;
      setCurrentSlide(newSlide);
      scrollToSlide(newSlide);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      const newSlide = currentSlide - 1;
      setCurrentSlide(newSlide);
      scrollToSlide(newSlide);
    }
  };

  const scrollToSlide = (slideIndex) => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.offsetWidth;
      gsap.to(sliderRef.current, {
        scrollLeft: slideIndex * slideWidth,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => animateCurrentSlide(slideIndex)
      });
    }
  };

  const handleSlideClick = (slideIndex) => {
    setCurrentSlide(slideIndex);
    scrollToSlide(slideIndex);
  };

  // Handle wheel/scroll events for horizontal navigation
  useEffect(() => {
    if (!selectedOrder || !sliderRef.current) return;

    let scrollTimeout;
    const handleWheel = (e) => {
      e.preventDefault();
      
      // Clear any existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Debounce scroll to prevent multiple triggers
      scrollTimeout = setTimeout(() => {
        // Handle both vertical (deltaY) and horizontal (deltaX) scrolling
        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        
        if (delta > 0 && currentSlide < 4) {
          // Scroll right/down = next slide
          handleNextSlide();
        } else if (delta < 0 && currentSlide > 0) {
          // Scroll left/up = previous slide
          handlePrevSlide();
        }
      }, 50);
    };

    const slider = sliderRef.current;
    slider.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      slider.removeEventListener('wheel', handleWheel);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [selectedOrder, currentSlide]);

  const handleCloseJourney = () => {
    gsap.to('.journey-content', {
      opacity: 0,
      scale: 0.9,
      y: 50,
      duration: 0.3,
    });
    
    gsap.to('.journey-viewer', {
      opacity: 0,
      duration: 0.3,
      delay: 0.1,
      onComplete: () => {
        setSelectedOrder(null);
      }
    });
  };

  if (orders.length === 0) {
    return (
      <div className="my-orders-page">
        <div className="orders-container">
          <h1 className="orders-title">My Orders</h1>
          <div className="empty-orders">
            <div className="empty-icon">📦</div>
            <h2>No Orders Yet</h2>
            <p>You haven't placed any orders yet. Start shopping to see your orders here!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-orders-page">
      <div className="orders-container">
        <h1 className="orders-title">My Orders ({orders.length})</h1>
        <p className="orders-subtitle">Track and manage your art purchases</p>

        <div className="orders-grid">
          {orders.map((order, index) => (
            <div key={order.id} className="order-card">
              <div className="order-image">
                <img src={order.product.image} alt={order.product.name} />
                <div className="order-number">Order #{order.id}</div>
              </div>

              <div className="order-info">
                <h3>{order.product.name}</h3>
                <div className="order-meta">
                  <span className="meta-item">
                    <span className="meta-icon">🎨</span>
                    {order.product.type}
                  </span>
                  <span className="meta-item">
                    <span className="meta-icon">📦</span>
                    Qty: {order.quantity || 1}
                  </span>
                </div>

                <div className="order-price">
                  ₹{(order.total || (order.product.price * (order.quantity || 1))).toLocaleString()}
                </div>

                <div className="order-date">
                  <span className="date-icon">📅</span>
                  <span>{order.date}</span>
                </div>

                <div className="order-status">
                  <div className="status-badge delivered">
                    <span className="status-icon">✓</span>
                    <span>Order Confirmed</span>
                  </div>
                </div>

                <button 
                  className="view-journey-btn"
                  onClick={() => handleViewJourney(order)}
                >
                  <span>👁️</span>
                  <span>View Complete Journey</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedOrder && (
        <div className="journey-viewer">
          <button className="close-journey" onClick={handleCloseJourney}>
            ✕
          </button>

          {/* Horizontal Slider */}
          <div className="journey-slider-container" ref={sliderRef}>
            {/* Slide 1: Order Confirmed */}
            <div className="journey-slide">
              <div className="slide-content">
                <div className="slide-header">
                  <div className="slide-icon confirmed">
                    <img src={greenTickGif} alt="Confirmed" style={{width: '60px', height: '60px', objectFit: 'contain'}} />
                  </div>
                  <h2>Order Confirmed</h2>
                  <p className="slide-subtitle">{selectedOrder.product.name}</p>
                  <p className="slide-order-id">Order #{selectedOrder.id}</p>
                </div>

                <div className="slide-animation">
                  <img src={greenTickGif} alt="Order Confirmed" className="animated-svg" style={{maxWidth: '300px', width: '100%', height: 'auto'}} />
                </div>

                <div className="slide-details">
                  <div className="detail-card">
                    <div className="detail-icon">📅</div>
                    <div className="detail-info">
                      <strong>Order Date</strong>
                      <span>{selectedOrder.date} at {selectedOrder.time}</span>
                    </div>
                  </div>
                  <div className="detail-card">
                    <div className="detail-icon">🎨</div>
                    <div className="detail-info">
                      <strong>Product</strong>
                      <span>{selectedOrder.product.name}</span>
                    </div>
                  </div>
                  <div className="detail-card">
                    <div className="detail-icon">📦</div>
                    <div className="detail-info">
                      <strong>Quantity</strong>
                      <span>{selectedOrder.quantity || 1} item(s)</span>
                    </div>
                  </div>
                  <div className="detail-card">
                    <div className="detail-icon">💰</div>
                    <div className="detail-info">
                      <strong>Total Amount</strong>
                      <span>₹{(selectedOrder.total || (selectedOrder.product.price * (selectedOrder.quantity || 1))).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="detail-card">
                    <div className="detail-icon">🔍</div>
                    <div className="detail-info">
                      <strong>Tracking ID</strong>
                      <span className="tracking-code">{selectedOrder.trackingId}</span>
                    </div>
                  </div>
                </div>

                <div className="slide-status">
                  <div className="status-badge success">
                    <span>✓</span> Order Successfully Placed
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 2: Packaging */}
            <div className="journey-slide">
              <div className="slide-content">
                <div className="slide-header">
                  <div className="slide-icon packaging">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                      <line x1="12" y1="22.08" x2="12" y2="12"/>
                    </svg>
                  </div>
                  <h2>Packaging in Progress</h2>
                  <p className="slide-subtitle">Premium packaging with care</p>
                </div>

                <div className="slide-animation">
                  <div className="packaging-video-container">
                    <img 
                      src={packagingAnimation} 
                      alt="Packaging Process" 
                      className="packaging-video-gif"
                    />
                    <div className="live-indicator">
                      <span className="live-dot"></span>
                      <span className="live-label">LIVE</span>
                    </div>
                  </div>
                </div>

                <div className="slide-details">
                  <div className="detail-card">
                    <div className="detail-icon">📦</div>
                    <div className="detail-info">
                      <strong>Packaging Type</strong>
                      <span>Premium with bubble wrap</span>
                    </div>
                  </div>
                  <div className="detail-card">
                    <div className="detail-icon">👨‍🔧</div>
                    <div className="detail-info">
                      <strong>Team</strong>
                      <span>Expert packaging specialists</span>
                    </div>
                  </div>
                  <div className="detail-card">
                    <div className="detail-icon">🛡️</div>
                    <div className="detail-info">
                      <strong>Protection</strong>
                      <span>Fragile handling with care</span>
                    </div>
                  </div>
                  <div className="detail-card">
                    <div className="detail-icon">⏱️</div>
                    <div className="detail-info">
                      <strong>Status</strong>
                      <span>Carefully packing your artwork</span>
                    </div>
                  </div>
                </div>

                <div className="slide-status">
                  <div className="status-badge in-progress">
                    <span>🔄</span> In Progress
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 3: Dispatched */}
            <div className="journey-slide">
              <div className="slide-content">
                <div className="slide-header">
                  <div className="slide-icon dispatch">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="1" y="3" width="15" height="13"/>
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                      <circle cx="5.5" cy="18.5" r="2.5"/>
                      <circle cx="18.5" cy="18.5" r="2.5"/>
                    </svg>
                  </div>
                  <h2>Ready for Dispatch</h2>
                  <p className="slide-subtitle">On the way to warehouse</p>
                </div>

                <div className="slide-animation">
                  <img src={dispatchGif} alt="Dispatch Animation" className="animated-svg" style={{maxWidth: '300px', width: '100%', height: 'auto'}} />
                </div>

                <div className="slide-details">
                  <div className="detail-card">
                    <div className="detail-icon">🏢</div>
                    <div className="detail-info">
                      <strong>Warehouse</strong>
                      <span>Central Distribution Center</span>
                    </div>
                  </div>
                  <div className="detail-card">
                    <div className="detail-icon">🚚</div>
                    <div className="detail-info">
                      <strong>Transport</strong>
                      <span>Premium logistics partner</span>
                    </div>
                  </div>
                  <div className="detail-card">
                    <div className="detail-icon">📍</div>
                    <div className="detail-info">
                      <strong>Current Location</strong>
                      <span>Awaiting dispatch</span>
                    </div>
                  </div>
                  <div className="detail-card">
                    <div className="detail-icon">⏰</div>
                    <div className="detail-info">
                      <strong>Expected Dispatch</strong>
                      <span>Within 24 hours</span>
                    </div>
                  </div>
                </div>

                <div className="slide-status">
                  <div className="status-badge pending">
                    <span>⏳</span> Pending
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 4: Out for Delivery */}
            <div className="journey-slide">
              <div className="slide-content">
                <div className="slide-header">
                  <div className="slide-icon delivery">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                      <polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                  </div>
                  <h2>Out for Delivery</h2>
                  <p className="slide-subtitle">On the way to your doorstep</p>
                </div>

                <div className="slide-animation">
                  <svg viewBox="0 0 500 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="animated-svg delivery-animation-pro">
                    {/* Sky gradient background */}
                    <defs>
                      <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{stopColor: '#E3F2FD', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: '#FFF9F0', stopOpacity: 1}} />
                      </linearGradient>
                      <linearGradient id="roadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{stopColor: '#757575', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: '#9E9E9E', stopOpacity: 1}} />
                      </linearGradient>
                      <filter id="shadow">
                        <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.3"/>
                      </filter>
                    </defs>
                    
                    {/* Background */}
                    <rect width="500" height="300" fill="url(#skyGradient)"/>
                    
                    {/* Road */}
                    <ellipse cx="250" cy="230" rx="240" ry="40" fill="url(#roadGradient)" opacity="0.4"/>
                    <rect x="0" y="220" width="500" height="50" fill="url(#roadGradient)"/>
                    
                    {/* Road markings */}
                    <g className="road-lines">
                      <rect x="20" y="242" width="40" height="4" fill="#FFD700" opacity="0.6" rx="2"/>
                      <rect x="100" y="242" width="40" height="4" fill="#FFD700" opacity="0.6" rx="2"/>
                      <rect x="180" y="242" width="40" height="4" fill="#FFD700" opacity="0.6" rx="2"/>
                      <rect x="260" y="242" width="40" height="4" fill="#FFD700" opacity="0.6" rx="2"/>
                      <rect x="340" y="242" width="40" height="4" fill="#FFD700" opacity="0.6" rx="2"/>
                      <rect x="420" y="242" width="40" height="4" fill="#FFD700" opacity="0.6" rx="2"/>
                    </g>
                    
                    {/* Destination house */}
                    <g className="destination-house" filter="url(#shadow)">
                      {/* House base */}
                      <rect x="380" y="140" width="80" height="75" fill="#FFF9F0" stroke="#D4A574" strokeWidth="3"/>
                      {/* Roof */}
                      <path d="M 375 140 L 420 100 L 465 140 Z" fill="#D4A574" stroke="#B8860B" strokeWidth="3"/>
                      {/* Door */}
                      <rect x="400" y="175" width="25" height="40" fill="#B8860B" rx="2"/>
                      <circle cx="420" cy="195" r="2" fill="#FFD700"/>
                      {/* Windows */}
                      <rect x="385" y="155" width="18" height="18" fill="#E3F2FD" stroke="#D4A574" strokeWidth="2"/>
                      <rect x="432" y="155" width="18" height="18" fill="#E3F2FD" stroke="#D4A574" strokeWidth="2"/>
                      <line x1="394" y1="155" x2="394" y2="173" stroke="#D4A574" strokeWidth="2"/>
                      <line x1="385" y1="164" x2="403" y2="164" stroke="#D4A574" strokeWidth="2"/>
                      <line x1="441" y1="155" x2="441" y2="173" stroke="#D4A574" strokeWidth="2"/>
                      <line x1="432" y1="164" x2="450" y2="164" stroke="#D4A574" strokeWidth="2"/>
                      {/* Location pin */}
                      <g className="location-pin">
                        <path d="M 420 95 Q 420 85 428 85 Q 436 85 436 95 Q 436 100 428 110 Q 420 100 420 95 Z" fill="#FF5252"/>
                        <circle cx="428" cy="92" r="3" fill="#FFF"/>
                      </g>
                    </g>
                    
                    {/* Delivery vehicle with package */}
                    <g className="delivery-vehicle" filter="url(#shadow)">
                      {/* Vehicle shadow */}
                      <ellipse cx="120" cy="225" rx="45" ry="8" fill="#000" opacity="0.2"/>
                      
                      {/* Scooter body */}
                      <path d="M 85 200 Q 90 195 100 195 L 130 195 Q 140 195 140 205 L 140 210 L 85 210 Z" fill="#2196F3"/>
                      <rect x="100" y="190" width="35" height="8" rx="4" fill="#1565C0"/>
                      
                      {/* Package box on back */}
                      <g className="package-box">
                        <rect x="70" y="185" width="22" height="20" fill="#FFD700" stroke="#B8860B" strokeWidth="2" rx="2"/>
                        <line x1="70" y1="195" x2="92" y2="195" stroke="#B8860B" strokeWidth="2"/>
                        <line x1="81" y1="185" x2="81" y2="205" stroke="#B8860B" strokeWidth="2"/>
                        {/* Tape strips */}
                        <rect x="74" y="188" width="14" height="2" fill="#B8860B" opacity="0.5"/>
                        <rect x="74" y="198" width="14" height="2" fill="#B8860B" opacity="0.5"/>
                      </g>
                      
                      {/* Driver */}
                      <g className="driver">
                        <circle cx="115" cy="180" r="10" fill="#D4A574"/>
                        <rect x="110" y="190" width="10" height="12" fill="#1565C0" rx="2"/>
                        {/* Helmet */}
                        <path d="M 105 180 Q 105 170 115 170 Q 125 170 125 180" fill="#FF5252"/>
                        <ellipse cx="115" cy="178" rx="6" ry="4" fill="#FFF" opacity="0.3"/>
                      </g>
                      
                      {/* Handle bars */}
                      <line x1="125" y1="195" x2="135" y2="188" stroke="#1565C0" strokeWidth="3" strokeLinecap="round"/>
                      
                      {/* Wheels with rotation */}
                      <g className="wheel-front">
                        <circle cx="135" cy="215" r="12" fill="#2C1810" stroke="#424242" strokeWidth="3"/>
                        <circle cx="135" cy="215" r="6" fill="#616161"/>
                        <circle cx="135" cy="215" r="2" fill="#D4A574"/>
                        {/* Spokes */}
                        <line x1="135" y1="215" x2="135" y2="203" stroke="#9E9E9E" strokeWidth="1.5"/>
                        <line x1="135" y1="215" x2="147" y2="215" stroke="#9E9E9E" strokeWidth="1.5"/>
                      </g>
                      
                      <g className="wheel-back">
                        <circle cx="90" cy="215" r="12" fill="#2C1810" stroke="#424242" strokeWidth="3"/>
                        <circle cx="90" cy="215" r="6" fill="#616161"/>
                        <circle cx="90" cy="215" r="2" fill="#D4A574"/>
                        {/* Spokes */}
                        <line x1="90" y1="215" x2="102" y2="215" stroke="#9E9E9E" strokeWidth="1.5"/>
                        <line x1="90" y1="215" x2="90" y2="227" stroke="#9E9E9E" strokeWidth="1.5"/>
                      </g>
                      
                      {/* Motion lines */}
                      <g className="motion-lines">
                        <line x1="55" y1="200" x2="65" y2="200" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
                        <line x1="50" y1="205" x2="62" y2="205" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
                        <line x1="58" y1="210" x2="68" y2="210" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
                      </g>
                    </g>
                    
                    {/* Dotted path line */}
                    <g className="path-indicator">
                      <circle cx="200" cy="120" r="3" fill="#2196F3" opacity="0.4"/>
                      <circle cx="240" cy="115" r="3" fill="#2196F3" opacity="0.5"/>
                      <circle cx="280" cy="118" r="3" fill="#2196F3" opacity="0.6"/>
                      <circle cx="320" cy="120" r="3" fill="#2196F3" opacity="0.7"/>
                      <circle cx="360" cy="125" r="3" fill="#2196F3" opacity="0.8"/>
                    </g>
                    
                    {/* Clouds */}
                    <g opacity="0.3">
                      <ellipse cx="100" cy="50" rx="25" ry="15" fill="#FFF"/>
                      <ellipse cx="115" cy="50" rx="20" ry="12" fill="#FFF"/>
                      <ellipse cx="85" cy="50" rx="18" ry="10" fill="#FFF"/>
                    </g>
                  </svg>
                </div>

                <div className="slide-details">
                  <div className="detail-card">
                    <div className="detail-icon">🏠</div>
                    <div className="detail-info">
                      <strong>Delivery Address</strong>
                      <span>Your registered address</span>
                    </div>
                  </div>
                  <div className="detail-card">
                    <div className="detail-icon">👨‍✈️</div>
                    <div className="detail-info">
                      <strong>Delivery Partner</strong>
                      <span>Will be assigned soon</span>
                    </div>
                  </div>
                  <div className="detail-card">
                    <div className="detail-icon">📞</div>
                    <div className="detail-info">
                      <strong>Contact</strong>
                      <span>Available on dispatch</span>
                    </div>
                  </div>
                  <div className="detail-card">
                    <div className="detail-icon">🕐</div>
                    <div className="detail-info">
                      <strong>Expected Time</strong>
                      <span>3-5 business days</span>
                    </div>
                  </div>
                </div>

                <div className="slide-status">
                  <div className="status-badge pending">
                    <span>⏳</span> Pending
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 5: Delivered */}
            <div className="journey-slide">
              <div className="slide-content">
                <div className="slide-header">
                  <div className="slide-icon delivered">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                    </svg>
                  </div>
                  <h2>Delivered</h2>
                  <p className="slide-subtitle">Enjoy your beautiful artwork!</p>
                </div>

                <div className="slide-animation">
                  <img 
                    key={currentDeliveryImage}
                    src={deliveryImages[currentDeliveryImage]} 
                    alt={`Delivery ${currentDeliveryImage + 1}`}
                    className="delivery-carousel-image" 
                    style={{maxWidth: '300px', width: '100%', height: 'auto', borderRadius: '16px'}}
                  />
                </div>

                <div className="slide-details">
                  <div className="detail-card">
                    <div className="detail-icon">✅</div>
                    <div className="detail-info">
                      <strong>Status</strong>
                      <span>To be delivered soon</span>
                    </div>
                  </div>
                  <div className="detail-card">
                    <div className="detail-icon">📅</div>
                    <div className="detail-info">
                      <strong>Expected Delivery</strong>
                      <span>5-7 business days</span>
                    </div>
                  </div>
                  <div className="detail-card">
                    <div className="detail-icon">🎁</div>
                    <div className="detail-info">
                      <strong>Packaging</strong>
                      <span>Premium gift packaging</span>
                    </div>
                  </div>
                  <div className="detail-card">
                    <div className="detail-icon">⭐</div>
                    <div className="detail-info">
                      <strong>Quality</strong>
                      <span>Verified and certified</span>
                    </div>
                  </div>
                </div>

                <div className="slide-status">
                  <div className="status-badge pending">
                    <span>⏳</span> Awaiting Delivery
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Hint */}
          <div className="scroll-hint">
            {currentSlide < 4 ? '← Scroll to navigate between steps →' : '← Scroll back to see previous steps'}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyOrders;
