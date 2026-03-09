import { useEffect } from 'react';
import gsap from 'gsap';
import './Dispatch.css';

function Dispatch({ product, isActive }) {
  useEffect(() => {
    if (!isActive) return;

    const tl = gsap.timeline();
    
    tl.fromTo('.dispatch-title',
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 0.6 }
    )
    .fromTo('.warehouse',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8 }
    )
    .fromTo('.warehouse-workers .worker',
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.2 }
    )
    .fromTo('.dispatch-package',
      { scale: 1.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6 }
    )
    .to('.dispatch-package', {
      x: 150,
      y: -50,
      duration: 1.5,
      ease: 'power2.inOut'
    })
    .to('.warehouse-workers', {
      x: 100,
      duration: 1.5,
      ease: 'power2.inOut'
    }, '-=1.5')
    .fromTo('.delivery-van',
      { x: -200, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power2.out' }
    )
    .to('.dispatch-package', {
      x: 350,
      y: 20,
      scale: 0.6,
      duration: 1,
      ease: 'power2.inOut'
    })
    .to('.van-door', {
      scaleX: 0,
      duration: 0.6,
      ease: 'power2.inOut'
    }, '-=0.5')
    .to('.dispatch-package', {
      opacity: 0,
      duration: 0.3
    })
    .to('.van-door', {
      scaleX: 1,
      duration: 0.6,
      ease: 'power2.inOut'
    })
    .fromTo('.dispatch-status',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
    );

    gsap.to('.delivery-van', {
      y: -5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    gsap.to('.warehouse-workers .worker', {
      rotation: 5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.3
    });

  }, [isActive]);

  return (
    <div className="dispatch-section">
      <h1 className="dispatch-title">Dispatching Your Order</h1>
      
      <div className="dispatch-scene">
        <div className="warehouse">
          <div className="warehouse-building">
            <div className="building-roof"></div>
            <div className="building-body">
              <div className="warehouse-sign">📦 WAREHOUSE</div>
              <div className="warehouse-door"></div>
            </div>
          </div>

          <div className="warehouse-workers">
            <div className="worker">👷</div>
            <div className="worker">👨‍🔧</div>
          </div>

          <div className="dispatch-package">
            <div className="package-box-dispatch">
              📦
            </div>
          </div>
        </div>

        <div className="loading-area">
          <div className="loading-arrow">→</div>
        </div>

        <div className="delivery-van">
          <div className="van-body">
            <div className="van-front">
              <div className="van-window"></div>
              <div className="van-driver">👨‍✈️</div>
            </div>
            <div className="van-cargo">
              <div className="van-door"></div>
              <div className="company-logo">🎨 ART CO.</div>
            </div>
            <div className="van-wheels">
              <div className="wheel"></div>
              <div className="wheel"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="dispatch-status">
        <div className="status-icon">🚚</div>
        <div className="status-content">
          <h2>Your Order Has Been Dispatched</h2>
          <p>On its way to your doorstep</p>
        </div>
      </div>

      <div className="scroll-hint">Scroll to track delivery</div>
    </div>
  );
}

export default Dispatch;
