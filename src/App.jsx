import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProductShowcase from './components/ProductShowcase';
import ProductDetail from './components/ProductDetail';
import ThankYou from './components/ThankYou';
import MyOrders from './components/MyOrders';
import Packaging from './components/Packaging';
import Dispatch from './components/Dispatch';
import Delivery from './components/Delivery';
import CustomerHome from './components/CustomerHome';
import TrackingPanel from './components/TrackingPanel';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentSection, setCurrentSection] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orders, setOrders] = useState([]);
  const [trackingStatus, setTrackingStatus] = useState({
    purchased: false,
    packaging: false,
    dispatch: false,
    delivery: false,
    displayed: false
  });
  
  const isScrolling = useRef(false);
  const sections = orderPlaced ? 5 : 1;

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('artOrders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem('artOrders', JSON.stringify(orders));
    }
  }, [orders]);

  // Navigation handlers
  const handleNavigation = (page) => {
    setCurrentPage(page);
    if (page === 'products') {
      setOrderPlaced(false);
      setCurrentSection(0);
      setShowThankYou(false);
      setSelectedProduct(null);
      setSelectedProductForDetail(null);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProductForDetail(product);
    setCurrentPage('productDetail');
  };

  const handleConfirmOrder = (product, quantity) => {
    const newOrder = {
      id: Date.now().toString(),
      product: product,
      quantity: quantity,
      total: product.price * quantity,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      status: 'Processing',
      trackingId: `ART${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    };

    setOrders(prev => [...prev, newOrder]);
    
    // Directly redirect to My Orders page
    setCurrentPage('myorders');
  };

  useEffect(() => {
    const handleWheel = (e) => {
      if (isScrolling.current || showThankYou || currentPage !== 'products' || !orderPlaced) return;
      
      e.preventDefault();
      isScrolling.current = true;

      if (e.deltaY > 0) {
        setCurrentSection(prev => Math.min(prev + 1, sections - 1));
      } else {
        setCurrentSection(prev => Math.max(prev - 1, 0));
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [sections, showThankYou, currentPage, orderPlaced]);

  useEffect(() => {
    if (currentSection === 1 && orderPlaced) {
      setTimeout(() => setTrackingStatus(prev => ({ ...prev, packaging: true })), 500);
    }
    if (currentSection === 2 && orderPlaced) {
      setTimeout(() => setTrackingStatus(prev => ({ ...prev, dispatch: true })), 500);
    }
    if (currentSection === 3 && orderPlaced) {
      setTimeout(() => setTrackingStatus(prev => ({ ...prev, delivery: true })), 500);
    }
    if (currentSection === 4 && orderPlaced) {
      setTimeout(() => setTrackingStatus(prev => ({ ...prev, displayed: true })), 500);
    }
  }, [currentSection, orderPlaced]);

  const handlePurchase = (product) => {
    setSelectedProductForDetail(product);
    setCurrentPage('productDetail');
  };

  const handleTrackingClick = (section) => {
    if (section === 0 && trackingStatus.purchased) setCurrentSection(0);
    if (section === 1 && trackingStatus.packaging) setCurrentSection(1);
    if (section === 2 && trackingStatus.dispatch) setCurrentSection(2);
    if (section === 3 && trackingStatus.delivery) setCurrentSection(3);
    if (section === 4 && trackingStatus.displayed) setCurrentSection(4);
  };

  return (
    <div className="app">
      <Navbar 
        currentPage={currentPage}
        onNavigate={handleNavigation}
        orderCount={orders.length}
      />
      
      {currentPage === 'products' && orderPlaced && (
        <TrackingPanel 
          trackingStatus={trackingStatus}
          currentSection={currentSection}
          onSectionClick={handleTrackingClick}
        />
      )}
      
      <div className="main-content">
        {currentPage === 'home' && (
          <Home onExploreProducts={() => setCurrentPage('products')} />
        )}

        {currentPage === 'products' && (
          <div className="sections-container">
            {showThankYou ? (
              <ThankYou product={selectedProduct} />
            ) : (
              <>
                <div 
                  className={`section ${currentSection === 0 ? 'active' : ''}`}
                  style={{ transform: `translateY(-${currentSection * 100}%)` }}
                >
                  <ProductShowcase onPurchase={handlePurchase} />
                </div>

                {orderPlaced && (
                  <>
                    <div 
                      className={`section ${currentSection === 1 ? 'active' : ''}`}
                      style={{ transform: `translateY(-${currentSection * 100}%)` }}
                    >
                      <Packaging product={selectedProduct} isActive={currentSection === 1} />
                    </div>

                    <div 
                      className={`section ${currentSection === 2 ? 'active' : ''}`}
                      style={{ transform: `translateY(-${currentSection * 100}%)` }}
                    >
                      <Dispatch product={selectedProduct} isActive={currentSection === 2} />
                    </div>

                    <div 
                      className={`section ${currentSection === 3 ? 'active' : ''}`}
                      style={{ transform: `translateY(-${currentSection * 100}%)` }}
                    >
                      <Delivery product={selectedProduct} isActive={currentSection === 3} />
                    </div>

                    <div 
                      className={`section ${currentSection === 4 ? 'active' : ''}`}
                      style={{ transform: `translateY(-${currentSection * 100}%)` }}
                    >
                      <CustomerHome product={selectedProduct} isActive={currentSection === 4} />
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        )}

        {currentPage === 'productDetail' && selectedProductForDetail && (
          <ProductDetail 
            product={selectedProductForDetail}
            onConfirmOrder={handleConfirmOrder}
            onBack={() => setCurrentPage('products')}
          />
        )}

        {currentPage === 'myorders' && (
          <MyOrders orders={orders} />
        )}
      </div>
    </div>
  );
}

export default App;
