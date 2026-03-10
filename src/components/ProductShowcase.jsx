import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import './ProductShowcase.css';

const products = [
  {
    id: 1,
    name: 'Abstract Sunset',
    type: 'painting',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=600&fit=crop&auto=format',
    description: 'Beautiful abstract painting capturing the essence of a vibrant sunset with warm colors and fluid brushstrokes.'
  },
  {
    id: 2,
    name: 'Mountain Landscape',
    type: 'painting',
    price: 3299,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=600&fit=crop&auto=format',
    description: 'Stunning landscape painting featuring majestic mountains with intricate details and atmospheric depth.'
  },
  {
    id: 3,
    name: 'Ocean Waves',
    type: 'painting',
    price: 2799,
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=600&fit=crop',
    description: 'Dynamic seascape painting showing the power and beauty of ocean waves in motion.'
  },
  {
    id: 4,
    name: 'Modern Art',
    type: 'painting',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600&h=600&fit=crop&auto=format',
    description: 'Contemporary modern art piece with bold geometric patterns and vibrant color combinations.'
  },
  {
    id: 5,
    name: 'Ganesh Idol',
    type: 'structure',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=600&h=600&fit=crop&auto=format&q=80',
    description: 'Handcrafted Ganesh idol with intricate carvings, perfect for home decoration and spiritual ambiance.'
  },
  {
    id: 6,
    name: 'Buddha Sculpture',
    type: 'structure',
    price: 2299,
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&h=600&fit=crop&auto=format',
    description: 'Peaceful Buddha sculpture in meditation pose, bringing tranquility to any space.'
  },
  {
    id: 7,
    name: 'Dancing Shiva',
    type: 'structure',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1604537466158-719b1972feb8?w=600&h=600&fit=crop&auto=format',
    description: 'Exquisite Nataraja sculpture depicting the cosmic dance of Lord Shiva with detailed metalwork.'
  },
  {
    id: 8,
    name: 'Abstract Geometric',
    type: 'structure',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&h=600&fit=crop&auto=format',
    description: 'Modern geometric sculpture with clean lines and artistic appeal for contemporary homes.'
  },
  {
    id: 9,
    name: 'Floral Art',
    type: 'painting',
    price: 2199,
    image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600&h=600&fit=crop&auto=format',
    description: 'Vibrant floral painting with realistic details bringing nature into your living space.'
  },
  {
    id: 10,
    name: 'Wildlife Portrait',
    type: 'painting',
    price: 2899,
    image: 'https://images.unsplash.com/photo-1547234935-80c7145ec969?w=600&h=600&fit=crop&auto=format',
    description: 'Stunning wildlife portrait capturing the majesty and beauty of nature in vivid detail.'
  },
  {
    id: 11,
    name: 'Renaissance Art',
    type: 'painting',
    price: 4299,
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=600&h=600&fit=crop',
    description: 'Classic renaissance style painting with detailed brushwork and timeless artistic appeal.'
  },
  {
    id: 12,
    name: 'Metal Wall Art',
    type: 'structure',
    price: 2799,
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&h=600&fit=crop',
    description: 'Contemporary metal wall art sculpture with modern design and elegant finish.'
  }
];

function ProductShowcase({ onPurchase }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const cards = document.querySelectorAll('.product-card');
    gsap.fromTo(cards, 
      { opacity: 0, y: 50, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.6, ease: 'back.out(1.7)' }
    );
  }, []);

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    
    gsap.fromTo('.product-modal',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
    );
  };

  const handleConfirmOrder = () => {
    gsap.to('.product-modal', {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        onPurchase({ ...selectedProduct, quantity });
        setSelectedProduct(null);
      }
    });
  };

  const closeModal = () => {
    gsap.to('.product-modal', {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      onComplete: () => setSelectedProduct(null)
    });
  };

  return (
    <div className="product-showcase">
      <div className="showcase-header">
        <h1 className="showcase-title">Artisan Collection</h1>
        <p className="showcase-subtitle">Discover Exquisite Paintings & Handcrafted Sculptures</p>
      </div>

      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              <div className="product-type-badge">{product.type}</div>
              <div className="product-overlay">
                <button 
                  className="quick-view-btn"
                  onClick={() => handleBuyNow(product)}
                >
                  View Details
                </button>
              </div>
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">₹{product.price.toLocaleString()}</p>
              <button 
                className="buy-now-btn"
                onClick={() => handleBuyNow(product)}
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="scroll-indicator">
        <p>Scroll down to see the complete order journey</p>
        <div className="scroll-arrow">↓</div>
      </div>

      {selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>×</button>
            
            <div className="modal-content">
              <div className="modal-image">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>
              
              <div className="modal-details">
                <h2>{selectedProduct.name}</h2>
                <p className="modal-type">{selectedProduct.type.toUpperCase()}</p>
                <p className="modal-description">{selectedProduct.description}</p>
                
                <div className="modal-price">₹{selectedProduct.price.toLocaleString()}</div>
                
                <div className="quantity-selector">
                  <label>Quantity:</label>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity === 1}
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                  </div>
                </div>
                
                <div className="modal-total">
                  Total: ₹{(selectedProduct.price * quantity).toLocaleString()}
                </div>
                
                <button className="confirm-order-btn" onClick={handleConfirmOrder}>
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductShowcase;
