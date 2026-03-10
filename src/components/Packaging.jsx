import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Packaging.css';
import packagingAnimation from '../animation12.gif';

function Packaging({ product, isActive }) {
  const animationRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const tl = gsap.timeline();
    
    tl.fromTo('.packaging-title',
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 0.6 }
    )
    .fromTo('.packaging-subtitle',
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    )
    .fromTo('.packaging-animation-container',
      { opacity: 0, scale: 0.9, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.2)' },
      '-=0.2'
    )
    .fromTo('.worker',
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.2 },
      '-=0.3'
    )
    .fromTo('.material-item',
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 }
    )
    .fromTo('.animated-box-3d',
      { opacity: 0, scale: 0.5, rotateY: -180 },
      { opacity: 1, scale: 1, rotateY: 0, duration: 1.2, ease: 'back.out(1.5)' }
    )
    .to('.box-flap-top, .box-flap-bottom', {
      rotateX: -120,
      duration: 1.5,
      ease: 'power2.out',
      stagger: 0.2
    })
    .to('.box-flap-left, .box-flap-right', {
      rotateY: -100,
      duration: 1.2,
      ease: 'power2.out',
      stagger: 0.15
    }, '-=1')
    .fromTo('.product-inside',
      { opacity: 0, y: 50, scale: 0.5 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.5)' }
    )
    .to('.packaging-sparkle', {
      opacity: 1,
      scale: 1.5,
      duration: 0.8,
      stagger: 0.1,
      repeat: -1,
      yoyo: true
    })
    .fromTo('.info-item',
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.15 }
    )
    .fromTo('.status-label',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
    )
    .fromTo('.next-step-btn',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );

    // Continuous animations
    gsap.to('.packaging-animation-container', {
      y: -8,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    gsap.to('.worker', {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.3
    });

    gsap.to('.animated-box-3d', {
      rotateY: '+=10',
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    gsap.to('.product-inside', {
      y: -15,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
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
          {/* Professional Packaging Animation */}
          <div className="packaging-animation-container">
            <img 
              src={packagingAnimation} 
              alt="Packaging Process Animation" 
              className="packaging-gif"
            />
            <div className="animation-overlay">
              <div className="overlay-badge">
                <span className="badge-pulse"></span>
                <span className="badge-text-overlay">Live Process</span>
              </div>
            </div>
          </div>

          <div className="packaging-area">
            {/* 3D Animated Box */}
            <div className="animated-box-3d">
              {/* Box Body */}
              <div className="box-body">
                {/* Front Face */}
                <div className="box-face box-front">
                  <div className="box-tape-h"></div>
                  <div className="box-tape-v"></div>
                  <div className="fragile-sticker">
                    <span className="warning-icon">⚠️</span>
                    <span>FRAGILE</span>
                  </div>
                  <div className="art-gallery-logo">
                    <span className="logo-icon">🎨</span>
                    <span className="logo-text">ArtVista</span>
                  </div>
                </div>
                
                {/* Back Face */}
                <div className="box-face box-back"></div>
                
                {/* Left Face */}
                <div className="box-face box-left">
                  <div className="box-texture"></div>
                </div>
                
                {/* Right Face */}
                <div className="box-face box-right">
                  <div className="box-texture"></div>
                </div>
                
                {/* Bottom Face */}
                <div className="box-face box-bottom"></div>
                
                {/* Top Flaps */}
                <div className="box-flap box-flap-top">
                  <div className="flap-fold"></div>
                </div>
                <div className="box-flap box-flap-bottom">
                  <div className="flap-fold"></div>
                </div>
                <div className="box-flap box-flap-left">
                  <div className="flap-fold"></div>
                </div>
                <div className="box-flap box-flap-right">
                  <div className="flap-fold"></div>
                </div>
              </div>
              
              {/* Product Inside Box */}
              <div className="product-inside">
                <div className="product-icon">
                  {product?.type === 'painting' ? '🖼️' : '🗿'}
                </div>
                <div className="product-glow"></div>
              </div>
              
              {/* Sparkles/Shine Effect */}
              <div className="packaging-sparkle sparkle-1">✨</div>
              <div className="packaging-sparkle sparkle-2">✨</div>
              <div className="packaging-sparkle sparkle-3">✨</div>
              <div className="packaging-sparkle sparkle-4">✨</div>
            </div>
            
            {/* Packaging Info Badge */}
            <div className="packaging-badge">
              <div className="badge-icon">📦</div>
              <div className="badge-text">
                <span className="badge-title">Premium Packaging</span>
                <span className="badge-subtitle">In Progress</span>
              </div>
              <div className="badge-loader">
                <div className="loader-bar"></div>
              </div>
            </div>
          </div>

          <div className="packaging-steps">
            <div className="step-indicator active completed">
              <div className="step-num">✓</div>
              <span>Inspect Product</span>
            </div>
            <div className="step-indicator active">
              <div className="step-num">2</div>
              <span>Wrap Securely</span>
              <div className="step-progress"></div>
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
