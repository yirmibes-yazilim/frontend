import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const navigate = useNavigate();
  // Sabit tutarlar
  const urunToplami = 0;
  const kargo = 0;
  const toplam = urunToplami + kargo;

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', position: 'relative', minHeight: '60vh' }}>
      <button
        onClick={() => navigate('/')}
        style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer' }}
        aria-label="Kapat"
      >
        &times;
      </button>
      <h2>Sepetim</h2>
      <p>Sepetinizde ürün yok.</p>

      {/* Sepet Tutarı Sabit Alan */}
      <div style={{
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100vw',
        background: '#fff',
        boxShadow: '0 -2px 16px rgba(0,0,0,0.08)',
        borderTop: '1px solid #eee',
        zIndex: 1200,
        display: 'flex',
        justifyContent: 'center',
        padding: '0',
      }}>
        <div style={{ width: 600, maxWidth: '100%', padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 500, fontSize: 15 }}>
            <span>Ürün Toplamı</span>
            <span>{urunToplami} TL</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 500, fontSize: 15 }}>
            <span>Kargo</span>
            <span>{kargo} TL</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 16, marginTop: 2 }}>
            <span>TOPLAM</span>
            <span>{toplam} TL</span>
          </div>
          <button style={{ marginTop: 8, width: '100%', padding: '8px 0', background: '#00a6eb', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>
            Sepeti Onayla
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart; 