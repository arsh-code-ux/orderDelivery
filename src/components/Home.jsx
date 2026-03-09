import { useEffect } from 'react';
import gsap from 'gsap';
import './Home.css';

function Home({ onExploreProducts }) {
  useEffect(() => {
    // Hero animation
    gsap.fromTo('.hero-content',
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    );

    gsap.fromTo('.hero-title',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3 }
    );

    gsap.fromTo('.hero-subtitle',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5 }
    );

    gsap.fromTo('.hero-description',
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 0.7 }
    );

    gsap.fromTo('.hero-cta',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, delay: 0.9 }
    );

    // Feature cards animation
    gsap.fromTo('.feature-card',
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, delay: 1.1 }
    );

    // Stats animation
    gsap.fromTo('.stat-item',
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, delay: 1.3 }
    );

    // Floating animation for decorative elements
    gsap.to('.float-1', {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    gsap.to('.float-2', {
      y: -30,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 0.5
    });

    gsap.to('.float-3', {
      y: -25,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 1
    });
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="gradient-overlay"></div>
          <div className="decorative-circle float-1"></div>
          <div className="decorative-circle float-2"></div>
          <div className="decorative-circle float-3"></div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            Premium Art Products
            <span className="title-accent"> Delivered</span>
          </h1>
          <p className="hero-subtitle">
            Experience the Journey of Your Art
          </p>
          <p className="hero-description">
            From selection to your doorstep, witness every step of your order's journey.
            Premium paintings and structures crafted by master artists, delivered with care.
          </p>
          <button className="hero-cta" onClick={onExploreProducts}>
            Explore Collection
            <span className="cta-arrow">→</span>
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <div className="icon-circle">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <path d="M21 15l-5-5L5 21"/>
                </svg>
              </div>
            </div>
            <h3 className="feature-title">Premium Quality</h3>
            <p className="feature-description">
              Handcrafted masterpieces by renowned artists. Each piece comes with authenticity certificate.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <div className="icon-circle">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
            </div>
            <h3 className="feature-title">Track Your Order</h3>
            <p className="feature-description">
              Watch your art being packaged, dispatched, and delivered in real-time with our interactive tracking.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <div className="icon-circle">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
            </div>
            <h3 className="feature-title">Expert Care</h3>
            <p className="feature-description">
              Professional packaging team ensures your artwork arrives in perfect condition, fully insured.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <div className="icon-circle">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
            </div>
            <h3 className="feature-title">Visual Journey</h3>
            <p className="feature-description">
              Experience an immersive storytelling journey from purchase to delivery to your home display.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">5000+</div>
            <div className="stat-label">Happy Customers</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Art Pieces</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Master Artists</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Satisfaction</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Start Your Art Journey?</h2>
          <p className="cta-text">
            Discover our curated collection of premium paintings and sculptures
          </p>
          <button className="cta-button" onClick={onExploreProducts}>
            View Our Collection
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
