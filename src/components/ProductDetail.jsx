import { useState, useEffect } from 'react';
import gsap from 'gsap';
import './ProductDetail.css';
import Footer from './Footer';

function ProductDetail({ product, onConfirmOrder, onBack }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const productImages = product ? [
    product.image,
    product.image,
    product.image
  ] : [];

  useEffect(() => {
    if (!product) return;

    gsap.fromTo('.product-detail-container',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.6 }
    );

    gsap.fromTo('.detail-section',
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, delay: 0.3 }
    );
  }, [product]);

  if (!product) return null;

  const handleConfirm = () => {
    gsap.to('.product-detail-container', {
      scale: 0.95,
      opacity: 0.8,
      duration: 0.3,
      onComplete: () => {
        onConfirmOrder({ ...product, quantity });
      }
    });
  };

  const totalPrice = product.price * quantity;

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <button className="back-btn" onClick={onBack}>
          <span>←</span>
          <span>Back to Products</span>
        </button>

        <div className="product-detail-content">
          <div className="product-gallery">
            <div className="main-image">
              <img src={productImages[selectedImage]} alt={product.name} />
              <div className="image-badge">
                {product.type === 'painting' ? '🖼️ Painting' : '🗿 Sculpture'}
              </div>
            </div>
            <div className="thumbnail-list">
              {productImages.map((img, index) => (
                <div
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`${product.name} ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="product-details">
            <div className="detail-section">
              <div className="product-header">
                <h1 className="product-title">{product.name}</h1>
                <div className="product-type-tag">{product.type.toUpperCase()}</div>
              </div>
              <div className="product-price-section">
                <span className="price-label">Price:</span>
                <span className="product-price">₹{product.price.toLocaleString()}</span>
              </div>
            </div>

            <div className="detail-section">
              <h3>Description</h3>
              <p className="product-description">{product.description}</p>
            </div>

            <div className="detail-section">
              <h3>Product Details</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-icon">🎨</span>
                  <div>
                    <strong>Category:</strong>
                    <span>{product.type === 'painting' ? 'Original Painting' : 'Handcrafted Sculpture'}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">✨</span>
                  <div>
                    <strong>Quality:</strong>
                    <span>Premium Grade</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3>Features</h3>
              <ul className="features-list">
                <li>✓ 100% Original Artwork</li>
                <li>✓ Certificate of Authenticity</li>
                <li>✓ Premium Quality Materials</li>
                <li>✓ Carefully Hand-Packed</li>
              </ul>
            </div>

            <div className="detail-section order-section">
              <h3>Place Your Order</h3>
              <div className="quantity-selector-detail">
                <label>Quantity:</label>
                <div className="quantity-controls-detail">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity === 1}
                  >
                    -
                  </button>
                  <input type="number" value={quantity} readOnly />
                  <button onClick={() => setQuantity(quantity + 1)}>
                    +
                  </button>
                </div>
              </div>

              <div className="total-price-section">
                <div className="price-breakdown">
                  <div className="breakdown-row">
                    <span>Price per item:</span>
                    <span>₹{product.price.toLocaleString()}</span>
                  </div>
                  <div className="breakdown-row">
                    <span>Quantity:</span>
                    <span>× {quantity}</span>
                  </div>
                  <div className="breakdown-row">
                    <span>Shipping:</span>
                    <span className="free-shipping">FREE</span>
                  </div>
                  <div className="breakdown-row total">
                    <span>Total Amount:</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button className="confirm-order-btn-detail" onClick={handleConfirm}>
                <span className="btn-icon">✓</span>
                <span>Confirm Order - ₹{totalPrice.toLocaleString()}</span>
              </button>

              <div className="security-badges">
                <div className="badge-item">
                  <span>🔒</span>
                  <span>Secure Payment</span>
                </div>
                <div className="badge-item">
                  <span>✓</span>
                  <span>Verified Seller</span>
                </div>
                <div className="badge-item">
                  <span>⚡</span>
                  <span>Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default ProductDetail;
