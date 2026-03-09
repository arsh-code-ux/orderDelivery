import { useEffect } from 'react';
import gsap from 'gsap';
import './Delivery.css';

function Delivery({ product, isActive }) {
  useEffect(() => {
    if (!isActive) return;

    const tl = gsap.timeline();
    
    tl.fromTo('.delivery-title',
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 0.6 }
    )
    .fromTo('.city-background',
      { opacity: 0 },
      { opacity: 1, duration: 0.8 }
    )
    .fromTo('.route-path',
      { strokeDashoffset: 1000 },
      { strokeDashoffset: 0, duration: 3, ease: 'power1.inOut' }
    )
    .fromTo('.delivery-van-moving',
      { x: 0, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5 }
    )
    .to('.delivery-van-moving', {
      x: 400,
      duration: 3,
      ease: 'power1.inOut'
    }, '-=2.5')
    .to('.delivery-icon', {
      x: 400,
      duration: 3,
      ease: 'power1.inOut'
    }, '-=3')
    .fromTo('.customer-house',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' },
      '-=1'
    )
    .fromTo('.customer',
      { x: 0, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6 }
    )
    .to('.delivery-van-moving', {
      x: 600,
      duration: 1
    })
    .fromTo('.delivery-person',
      { x: 600, opacity: 0 },
      { x: 500, opacity: 1, duration: 0.8 }
    )
    .fromTo('.delivery-package',
      { scale: 1, x: 600 },
      { scale: 0.8, x: 450, duration: 0.6 }
    )
    .to('.delivery-package', {
      x: 350,
      duration: 0.8
    })
    .to('.delivery-package', {
      opacity: 0,
      duration: 0.3
    })
    .fromTo('.success-status',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }
    );

    gsap.to('.cloud', {
      x: 100,
      duration: 20,
      repeat: -1,
      ease: 'none',
      stagger: 5
    });

  }, [isActive]);

  return (
    <div className="delivery-section">
      <h1 className="delivery-title">Delivery in Progress</h1>
      
      <div className="delivery-scene">
        <div className="city-background">
          <div className="cloud">☁️</div>
          <div className="cloud">☁️</div>
          <div className="cloud">☁️</div>
          
          <div className="building-group">
            <div className="building">🏢</div>
            <div className="building">🏬</div>
            <div className="building">🏢</div>
          </div>

          <div className="tree-group">
            <div className="tree">🌳</div>
            <div className="tree">🌳</div>
          </div>
        </div>

        <div className="route-container">
          <svg className="route-map" viewBox="0 0 800 200">
            <path
              className="route-path"
              d="M 50 100 Q 200 50, 400 100 T 750 100"
              fill="none"
              stroke="#F5E6D3"
              strokeWidth="4"
              strokeDasharray="10,5"
            />
          </svg>
          
          <div className="delivery-icon">📍</div>
        </div>

        <div className="delivery-journey">
          <div className="journey-start">
            <div className="location-marker">🏭</div>
            <p>Warehouse</p>
          </div>

          <div className="delivery-van-moving">
            <div className="moving-van">🚚</div>
          </div>

          <div className="delivery-package">📦</div>
          
          <div className="delivery-person">🚶</div>

          <div className="journey-end">
            <div className="customer-house">
              <div className="house-roof"></div>
              <div className="house-body">
                <div className="house-door">🚪</div>
                <div className="house-window">🪟</div>
              </div>
            </div>
            <div className="customer">🧑</div>
            <p>Your Home</p>
          </div>
        </div>
      </div>

      <div className="success-status">
        <div className="success-icon">✅</div>
        <div className="success-content">
          <h2>Order Delivered Successfully</h2>
          <p>Your {product?.type} has reached safely</p>
        </div>
      </div>

      <div className="scroll-hint">Scroll to see final display</div>
    </div>
  );
}

export default Delivery;
