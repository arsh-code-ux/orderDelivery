import './TrackingPanel.css';

function TrackingPanel({ trackingStatus, currentSection, onSectionClick }) {
  const steps = [
    { id: 0, name: 'Product', icon: '🛍️', status: 'purchased' },
    { id: 1, name: 'Packaging', icon: '📦', status: 'packaging' },
    { id: 2, name: 'Dispatch', icon: '🚚', status: 'dispatch' },
    { id: 3, name: 'Delivery', icon: '🏠', status: 'delivery' },
    { id: 4, name: 'Display', icon: '🎨', status: 'displayed' }
  ];

  return (
    <div className="tracking-panel">
      <h3 className="tracking-title">Order Journey</h3>
      <div className="tracking-steps">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`tracking-step ${
              trackingStatus[step.status] ? 'unlocked' : 'locked'
            } ${currentSection === step.id ? 'active' : ''}`}
            onClick={() => onSectionClick(step.id)}
          >
            <div className="step-icon">{step.icon}</div>
            <div className="step-name">{step.name}</div>
            {trackingStatus[step.status] && (
              <div className="step-check">✓</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrackingPanel;
