import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Packaging.css';

function Packaging({ product, isActive }) {
  const animationRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const tl = gsap.timeline();
    
    tl.fromTo('.packaging-title',
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 0.6 }
    )
    .fromTo('.worker',
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.2 },
      '-=0.3'
    )
    .fromTo('.product-item',
      { scale: 1.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6 }
    )
    .to('.wrapping-material', {
      width: '100%',
      height: '100%',
      opacity: 0.8,
      duration: 1.5,
      ease: 'power2.inOut'
    })
    .to('.product-item', {
      scale: 0.8,
      duration: 1,
      ease: 'power2.inOut'
    }, '-=1')
    .fromTo('.package-box',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }
    )
    .to('.product-item, .wrapping-material', {
      opacity: 0,
      duration: 0.5
    }, '-=0.3')
    .fromTo('.decorative-elements',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }
    )
    .fromTo('.delivery-slip',
      { opacity: 0, y: -50, rotation: -10 },
      { opacity: 1, y: 0, rotation: 0, duration: 0.6 }
    )
    .to('.sealing-tape', {
      scaleX: 1,
      duration: 0.8,
      stagger: 0.2
    })
    .fromTo('.status-label',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
    )
    .fromTo('.next-step-btn',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );

    gsap.to('.worker', {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.3
    });

  }, [isActive]);

  return (
    <div className="packaging-section">
      <h1 className="packaging-title">Professional Packaging Process</h1>
      <p className="packaging-subtitle">Your art piece is being carefully prepared for safe delivery</p>
      
      <div className="packaging-workspace" ref={animationRef}>
        <div className="workspace-left">
          <div className="workers-team">
            <h3>Our Packaging Team</h3>
            <div className="workers-area">
              <div className="worker">
                <div className="worker-avatar">👷</div>
                <span className="worker-label">Supervisor</span>
              </div>
              <div className="worker">
                <div className="worker-avatar">👨‍🔧</div>
                <span className="worker-label">Packer</span>
              </div>
              <div className="worker">
                <div className="worker-avatar">👩‍🔧</div>
                <span className="worker-label">Quality Check</span>
              </div>
            </div>
          </div>

          <div className="packaging-materials">
            <h3>Packaging Materials</h3>
            <div className="materials-grid">
              <div className="material-item">
                <div className="material-icon">📦</div>
                <span>Premium Box</span>
              </div>
              <div className="material-item">
                <div className="material-icon">🛡️</div>
                <span>Bubble Wrap</span>
              </div>
              <div className="material-item">
                <div className="material-icon">📏</div>
                <span>Measuring Tools</span>
              </div>
              <div className="material-item">
                <div className="material-icon">✂️</div>
                <span>Cutting Tools</span>
              </div>
            </div>
          </div>
        </div>

        <div className="packaging-center">
          <div className="packaging-area">
            <div className="product-item">
              {product?.type === 'painting' ? '🖼️' : '🗿'}
            </div>
            
            <div className="wrapping-material"></div>
            
            <div className="package-box">
              <div className="box-face front">
                <div className="decorative-elements">
                  <span className="star">⭐</span>
                  <span className="star">⭐</span>
                  <span className="star">⭐</span>
                </div>
                <div className="delivery-slip">
                  <div className="slip-header">📋 DELIVERY</div>
                  <div className="slip-details">
                    <div className="slip-line"></div>
                    <div className="slip-line"></div>
                    <div className="slip-line"></div>
                  </div>
                </div>
              </div>
              <div className="sealing-tape horizontal"></div>
              <div className="sealing-tape vertical"></div>
              <div className="fragile-label">⚠️ FRAGILE</div>
            </div>
          </div>

          <div className="packaging-steps">
            <div className="step-indicator active">
              <div className="step-num">1</div>
              <span>Inspect Product</span>
            </div>
            <div className="step-indicator">
              <div className="step-num">2</div>
              <span>Wrap Securely</span>
            </div>
            <div className="step-indicator">
              <div className="step-num">3</div>
              <span>Box & Seal</span>
            </div>
            <div className="step-indicator">
              <div className="step-num">4</div>
              <span>Quality Check</span>
            </div>
          </div>
        </div>

        <div className="workspace-right">
          <div className="packaging-info">
            <h3>Package Details</h3>
            <div className="info-list">
              <div className="info-item">
                <span className="info-icon">📦</span>
                <div className="info-content">
                  <strong>Product:</strong>
                  <span>{product?.name}</span>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">🛡️</span>
                <div className="info-content">
                  <strong>Protection:</strong>
                  <span>Premium Packaging</span>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">✅</span>
                <div className="info-content">
                  <strong>Quality:</strong>
                  <span>Verified</span>
                </div>
              </div>
            </div>
          </div>

          <div className="tools-section">
            <h3>Tools Used</h3>
            <div className="tools-area">
              <div className="tool">
                <div className="tool-icon">📦</div>
                <span>Boxes</span>
              </div>
              <div className="tool">
                <div className="tool-icon">✂️</div>
                <span>Scissors</span>
              </div>
              <div className="tool">
                <div className="tool-icon">📏</div>
                <span>Ruler</span>
              </div>
              <div className="tool">
                <div className="tool-icon">🖊️</div>
                <span>Marker</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="status-label">
        <div className="status-icon">✅</div>
        <div className="status-text">
          <h2>Order Packed Successfully</h2>
          <p>Your art piece has been securely packaged with premium materials</p>
        </div>
      </div>

      <div className="next-step-btn">
        <span>Next Step: Dispatch to Warehouse</span>
        <span className="arrow">→</span>
      </div>

      <div className="scroll-hint">Scroll down to see dispatch process</div>
    </div>
  );
}

export default Packaging;
