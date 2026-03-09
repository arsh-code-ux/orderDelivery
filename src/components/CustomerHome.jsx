import { useEffect } from 'react';
import gsap from 'gsap';
import './CustomerHome.css';

function CustomerHome({ product, isActive }) {
  useEffect(() => {
    if (!isActive) return;

    const tl = gsap.timeline();
    
    tl.fromTo('.customer-home-title',
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 0.6 }
    )
    .fromTo('.living-room',
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8 }
    )
    .fromTo('.wall',
      { opacity: 0 },
      { opacity: 1, duration: 0.6 }
    )
    .fromTo('.displayed-art',
      { scale: 0, opacity: 0, rotation: -180 },
      { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: 'back.out(1.7)' }
    )
    .fromTo('.sparkle',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, stagger: 0.1 }
    )
    .fromTo('.guest',
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, stagger: 0.2 }
    )
    .fromTo('.admiration-bubble',
      { scale: 0, opacity: 0, y: 20 },
      { scale: 1, opacity: 1, y: 0, duration: 0.6, stagger: 0.2 }
    )
    .fromTo('.final-message',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }
    );

    gsap.to('.sparkle', {
      scale: 1.5,
      opacity: 0,
      duration: 1.5,
      repeat: -1,
      stagger: 0.3
    });

    gsap.to('.guest', {
      y: -5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.4
    });

  }, [isActive]);

  return (
    <div className="customer-home-section">
      <h1 className="customer-home-title">Your Art, Your Pride</h1>
      
      <div className="living-room">
        <div className="room-interior">
          <div className="wall">
            <div className="displayed-art">
              <div className="art-frame">
                <div className="art-piece">
                  {product?.type === 'painting' ? '🖼️' : '🗿'}
                </div>
                <div className="sparkle sparkle-1">✨</div>
                <div className="sparkle sparkle-2">✨</div>
                <div className="sparkle sparkle-3">✨</div>
                <div className="sparkle sparkle-4">✨</div>
              </div>
            </div>

            <div className="wall-decorations">
              <div className="wall-lamp">💡</div>
            </div>
          </div>

          <div className="furniture">
            <div className="sofa">🛋️</div>
            <div className="plant">🪴</div>
            <div className="table">
              <div className="table-surface"></div>
              <div className="table-items">☕📚</div>
            </div>
          </div>

          <div className="guests-area">
            <div className="guest">
              <div className="guest-icon">🧑‍🦱</div>
              <div className="pointing-hand">👉</div>
              <div className="admiration-bubble">
                <span>Wow! Beautiful!</span>
              </div>
            </div>

            <div className="guest">
              <div className="guest-icon">👨‍🦰</div>
              <div className="pointing-hand">👉</div>
              <div className="admiration-bubble">
                <span>Stunning!</span>
              </div>
            </div>

            <div className="guest">
              <div className="guest-icon">👩</div>
              <div className="pointing-hand">👉</div>
              <div className="admiration-bubble">
                <span>Amazing!</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="final-message">
        <div className="message-icon">🎨</div>
        <h2>Art That Brings Joy to Your Home</h2>
        <p>Thank you for choosing us for your artistic journey</p>
        <div className="satisfaction-badge">
          <span className="badge-icon">⭐</span>
          <span className="badge-text">Customer Satisfaction Guaranteed</span>
          <span className="badge-icon">⭐</span>
        </div>
      </div>

      <div className="journey-complete">
        <p>🎉 Journey Complete 🎉</p>
      </div>
    </div>
  );
}

export default CustomerHome;
