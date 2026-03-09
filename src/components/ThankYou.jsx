import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './ThankYou.css';

function ThankYou({ product }) {
  const confettiRef = useRef(null);

  useEffect(() => {
    const colors = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#6BCF7F', '#C77DFF'];
    const confettiContainer = confettiRef.current;
    
    for (let i = 0; i < 80; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 3 + 's';
      confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
      confettiContainer.appendChild(confetti);
    }

    const tl = gsap.timeline();
    tl.fromTo('.thank-you-content',
      { scale: 0, rotation: -180, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }
    )
    .fromTo('.success-badge',
      { scale: 0, y: -100 },
      { scale: 1, y: 0, duration: 0.6, ease: 'bounce.out' },
      '-=0.4'
    )
    .fromTo('.thank-you-heading',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.3'
    )
    .fromTo('.order-details-box',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6 },
      '-=0.2'
    )
    .fromTo('.celebration-team',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.2'
    )
    .fromTo('.next-steps',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.1'
    );

    gsap.to('.success-badge', {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: 'none'
    });

    return () => {
      confettiContainer.innerHTML = '';
    };
  }, []);

  return (
    <div className="thank-you-screen">
      <div className="confetti-container" ref={confettiRef}></div>
      
      <div className="thank-you-content">
        <div className="success-badge">
          <div className="badge-circle">
            <div className="checkmark">✓</div>
          </div>
        </div>
        
        <h1 className="thank-you-heading">Order Confirmed Successfully!</h1>
        
        <div className="order-details-box">
          <div className="detail-row">
            <span className="detail-label">Product:</span>
            <span className="detail-value">{product?.name}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Type:</span>
            <span className="detail-value">{product?.type?.toUpperCase()}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Quantity:</span>
            <span className="detail-value">{product?.quantity || 1}</span>
          </div>
          <div className="detail-row total">
            <span className="detail-label">Total Amount:</span>
            <span className="detail-value">₹{((product?.price || 0) * (product?.quantity || 1)).toLocaleString()}</span>
          </div>
        </div>

        <div className="celebration-team">
          <div className="team-member">
            <div className="member-icon">👨‍�</div>
            <p>Sales Team</p>
          </div>
          <div className="team-member">
            <div className="member-icon">�</div>
            <p>Celebrating</p>
          </div>
          <div className="team-member">
            <div className="member-icon">👩‍�</div>
            <p>Support Team</p>
          </div>
        </div>

        <div className="next-steps">
          <h3>What's Next?</h3>
          <div className="steps-list">
            <div className="step-item">
              <span className="step-number">1</span>
              <span>Your order is being prepared for packaging</span>
            </div>
            <div className="step-item">
              <span className="step-number">2</span>
              <span>Our team will carefully wrap and secure your art piece</span>
            </div>
            <div className="step-item">
              <span className="step-number">3</span>
              <span>Track your order journey in real-time</span>
            </div>
          </div>
        </div>

        <div className="redirect-message">
          <div className="loading-spinner"></div>
          <p>Preparing packaging process...</p>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
