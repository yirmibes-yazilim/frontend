import React from 'react';
import { useNavigate } from 'react-router-dom';

function Iletisim() {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: 500, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', position: 'relative' }}>
      <button
        onClick={() => navigate('/')}
        style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer' }}
        aria-label="Kapat"
      >
        &times;
      </button>
      <h2>İletişim</h2>
      <div style={{ marginBottom: 16 }}>
        <div><strong>Adres:</strong> Zafer Mah. 152. Cad. No:39 ADÜ Teknokent Efeler/Aydın <br />Şube: Yedieylül Mah. 1013 Sk. No:3 D Blok D:2 Efeler/Aydın</div>
        <div><strong>Telefon:</strong> 	+90 256 224 00 25</div>
      </div>
      <form>
        <div style={{ marginBottom: 12 }}>
          <label>Adınız Soyadınız (Firma Bilgileri)</label>
          <input type="text" style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 4, border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>e-mail</label>
          <input type="email" style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 4, border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Konu</label>
          <input type="text" style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 4, border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Mesajınız</label>
          <textarea rows={4} style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 4, border: '1px solid #ccc', resize: 'vertical' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: 10, background: '#00a6eb', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>
          Gönder
        </button>
      </form>
    </div>
  );
}

export default Iletisim; 