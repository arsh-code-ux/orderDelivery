import { useEffect } from 'react';
import './Home.css';
import orderBackground from '../Pasted image.png';

function Home({ onExploreProducts }) {
  useEffect(() => {
    // Content is now visible immediately via CSS
    // Removed GSAP animations to ensure reliable content display
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-background-image" style={{backgroundImage: `url(${orderBackground})`}}></div>
          <div className="gradient-overlay"></div>
          <div className="decorative-circle float-1"></div>
          <div className="decorative-circle float-2"></div>
          <div className="decorative-circle float-3"></div>
          <div className="pattern-overlay"></div>
        </div>

        <div className="hero-content">
          <div className="luxury-badge">PREMIUM ART GALLERY</div>
          <h1 className="hero-title">
            Premium Art Products
            <span className="title-accent"> Delivered</span>
          </h1>
          <p className="hero-subtitle">
            Experience the Journey of Your Art
          </p>
          <p className="hero-description">
            From selection to your doorstep, witness every step of your order's journey.
            Premium paintings and sculptures crafted by master artists, delivered with care.
            Each piece is authenticated, professionally packaged, and insured for your peace of mind.
          </p>
          <button className="hero-cta" onClick={onExploreProducts}>
            <span>Explore Collection</span>
            <span className="cta-arrow">→</span>
          </button>
          <div className="trust-indicators">
            <div className="trust-item">
              <span className="trust-icon">✓</span>
              <span>Authenticated</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">✓</span>
              <span>Insured</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">✓</span>
              <span>Premium Quality</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">Why Choose ArtVista</h2>
          <p className="section-subtitle">Excellence in Every Detail</p>
        </div>
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
            <div className="feature-badge">Certified</div>
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
            <div className="feature-badge">Real-Time</div>
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
            <div className="feature-badge">Insured</div>
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
            <div className="feature-badge">Immersive</div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-background"></div>
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">5000+</div>
            <div className="stat-label">Happy Customers</div>
            <div className="stat-subtext">Worldwide</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Art Pieces</div>
            <div className="stat-subtext">Curated Collection</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Master Artists</div>
            <div className="stat-subtext">Renowned Gallery</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Satisfaction</div>
            <div className="stat-subtext">Guaranteed</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-background"></div>
        <div className="cta-content">
          <div className="cta-badge">EXCLUSIVE COLLECTION</div>
          <h2 className="cta-title">Ready to Start Your Art Journey?</h2>
          <p className="cta-text">
            Discover our curated collection of premium paintings and sculptures.
            Each piece tells a story, crafted by master artists from around the world.
          </p>
          <button className="cta-button" onClick={onExploreProducts}>
            <span>View Our Collection</span>
            <span className="button-shine"></span>
          </button>
          <div className="cta-features">
            <div className="cta-feature-item">
              <span className="cta-feature-icon">🎨</span>
              <span>Authentic Artwork</span>
            </div>
            <div className="cta-feature-item">
              <span className="cta-feature-icon">🚚</span>
              <span>Free Delivery</span>
            </div>
            <div className="cta-feature-item">
              <span className="cta-feature-icon">💎</span>
              <span>Premium Quality</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
