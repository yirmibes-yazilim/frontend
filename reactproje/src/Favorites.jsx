import React from 'react';
import { useNavigate } from 'react-router-dom';

function Favorites() {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', position: 'relative' }}>
      <button
        onClick={() => navigate('/')}
        style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer' }}
        aria-label="Kapat"
      >
        &times;
      </button>
      <h2>Favoriler</h2>
      <p>Henüz favori ürününüz yok.</p>
    </div>
  );
}

export default Favorites; 