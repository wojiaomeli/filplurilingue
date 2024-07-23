import React from 'react';

const PushUp = ({ title, description, color, icon }) => {
  return (
    <div className="push-up-container" style={{ marginBottom: '20px' }}>
      <div className="push-up" style={{ display: 'flex', borderRadius: '0.5rem', overflow: 'hidden', border: '4px solid rgba(0, 0, 0, 0.1)', maxWidth: '100%', animation: 'slideIn 0.5s forwards' }}>
        <div className="push-up-color" style={{ flex: '0 0 4rem', backgroundColor: color, borderRight: '1px solid rgba(0, 0, 0, 0.1)' }}></div>
        <div className="push-up-content" style={{ flexGrow: 1, padding: '1rem', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ marginBottom: '0.5rem' }}>
            <h2 className="text-black text-lg font-semibold">{title}</h2>
            <p className="text-black mb-2">{description}</p>
          </div>
          {icon && <div style={{ marginBottom: '0.5rem', marginTop: '0.5rem' }}>{icon}</div>}
          <div>
            <button className="push-up-button" style={{ backgroundColor: color, color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.25rem', transition: 'background-color 0.3s, color 0.3s', marginTop: '0.5rem' }}>
              Découvrir
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes slideIn {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .push-up-container {
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .push-up {
            flex-direction: column;
            align-items: center; /* Centrer les éléments */
          }
          .push-up-color {
            border-right: none;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            flex: 0 0 auto;
            width: 100%;
            height: 4rem;
          }
          .push-up-content {
            padding: 1rem;
          }
          .push-up-button {
            width: 100%;
            margin-top: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PushUp;