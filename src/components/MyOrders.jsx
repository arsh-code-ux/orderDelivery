import { useState, useEffect } from 'react';
import gsap from 'gsap';
import './MyOrders.css';

function MyOrders({ orders }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    gsap.fromTo('.order-card',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
    );
  }, [orders]);

  const handleViewJourney = (order) => {
    setSelectedOrder(order);
    
    gsap.fromTo('.journey-viewer',
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.5 }
    );
  };

  const handleCloseJourney = () => {
    gsap.to('.journey-viewer', {
      opacity: 0,
      scale: 0.9,
      duration: 0.3,
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
                    Qty: {order.product.quantity}
                  </span>
                </div>

                <div className="order-price">
                  ₹{(order.product.price * order.product.quantity).toLocaleString()}
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
          <div className="journey-content">
            <button className="close-journey" onClick={handleCloseJourney}>
              ✕
            </button>

            <div className="journey-header">
              <h2>{selectedOrder.product.name}</h2>
              <p className="journey-order-id">Order #{selectedOrder.id}</p>
            </div>

            <div className="journey-timeline">
              <div className="timeline-step completed">
                <div className="step-icon">✓</div>
                <div className="step-info">
                  <h4>Order Confirmed</h4>
                  <p>{selectedOrder.date} at {selectedOrder.time}</p>
                  <span className="step-detail">Your order has been placed successfully</span>
                </div>
              </div>

              <div className="timeline-step completed">
                <div className="step-icon">📦</div>
                <div className="step-info">
                  <h4>Packaging</h4>
                  <p>In Progress</p>
                  <span className="step-detail">Our team is carefully packing your artwork with premium materials</span>
                </div>
              </div>

              <div className="timeline-step">
                <div className="step-icon">🚚</div>
                <div className="step-info">
                  <h4>Dispatched</h4>
                  <p>Pending</p>
                  <span className="step-detail">Will be dispatched soon from our warehouse</span>
                </div>
              </div>

              <div className="timeline-step">
                <div className="step-icon">🏠</div>
                <div className="step-info">
                  <h4>Out for Delivery</h4>
                  <p>Pending</p>
                  <span className="step-detail">Will be delivered to your address</span>
                </div>
              </div>

              <div className="timeline-step">
                <div className="step-icon">�</div>
                <div className="step-info">
                  <h4>Delivered</h4>
                  <p>Pending</p>
                  <span className="step-detail">Estimated delivery: 5-7 business days</span>
                </div>
              </div>
            </div>

            <div className="journey-details">
              <div className="detail-box">
                <h4>Order Summary</h4>
                <div className="summary-row">
                  <span>Product:</span>
                  <span>{selectedOrder.product.name}</span>
                </div>
                <div className="summary-row">
                  <span>Quantity:</span>
                  <span>{selectedOrder.product.quantity}</span>
                </div>
                <div className="summary-row">
                  <span>Price:</span>
                  <span>₹{selectedOrder.product.price.toLocaleString()}</span>
                </div>
                <div className="summary-row total">
                  <span>Total Amount:</span>
                  <span>₹{selectedOrder.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="detail-box">
                <h4>Tracking Information</h4>
                <div className="summary-row">
                  <span>Tracking ID:</span>
                  <span className="tracking-id">{selectedOrder.trackingId}</span>
                </div>
                <div className="summary-row">
                  <span>Status:</span>
                  <span className="status-text">{selectedOrder.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyOrders;
