import React from 'react';
import logo from './assets/logo.png';
import { useNavigate } from 'react-router-dom';

function Header({ onAccountClick }) {
  const navigate = useNavigate();
  return (
    <header style={{ borderBottom: '1px solid #eee', marginBottom: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px 8px 32px', background: '#fff' }}>
        {/* Arama kutusu */}
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <div style={{ position: 'relative', width: 180 }}>
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#888' }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </span>
            <input type="text" placeholder="" style={{ width: '100%', padding: '8px 8px 8px 36px', borderRadius: 20, border: 'none', background: '#f0f0f0', fontSize: 16 }} />
          </div>
        </div>
        {/* Logo */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
            <img src={logo} alt="logo" style={{ height: 70, objectFit: 'contain' }} />
          </button>
        </div>
        {/* Hesabım */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <button onClick={onAccountClick} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', marginRight: 16 }}>
            <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ marginRight: 4 }}>
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
            </svg>
            <span style={{ fontSize: 16, color: '#222' }}>Hesabım</span>
          </button>
          <button onClick={() => navigate('/favoriler')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', marginRight: 16 }}>
            {/* Kalp (Favoriler) ikonu */}
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ marginRight: 4 }}>
              <path d="M12 21s-6-4.35-9-7.5C-1.5 8.5 2.5 3 7.5 5.5c2.5 1.25 4.5 4.5 4.5 4.5s2-3.25 4.5-4.5C21.5 3 25.5 8.5 21 13.5c-3 3.15-9 7.5-9 7.5z" />
            </svg>
            <span style={{ fontSize: 16, color: '#222' }}>Favoriler</span>
          </button>
          <button onClick={() => navigate('/sepetim')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', marginRight: 16 }}>
            {/* Sepet ikonu */}
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ marginRight: 4 }}>
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span style={{ fontSize: 16, color: '#222' }}>Sepet</span>
          </button>
          <button onClick={() => navigate('/iletisim')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            {/* Mail (İletişim) ikonu */}
            <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ marginRight: 4 }}>
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span style={{ fontSize: 16, color: '#222' }}>İletişim</span>
          </button>
        </div>
      </div>
      {/* Mavi Menü */}
      <nav style={{ background: '#00a6eb', color: '#fff', display: 'flex', justifyContent: 'center', fontWeight: 500, fontSize: 16 }}>
        <div style={{ display: 'flex', width: '100%', maxWidth: 900 }}>
          <div style={{ flex: 1, textAlign: 'center', padding: '12px 0', cursor: 'pointer' }}>BİLGİSAYAR & TABLET</div>
          <div style={{ flex: 1, textAlign: 'center', padding: '12px 0', cursor: 'pointer' }}>DONANIM ÜRÜNLERİ</div>
          <div style={{ flex: 1, textAlign: 'center', padding: '12px 0', cursor: 'pointer' }}>AKSESUARLAR</div>
          <div style={{ flex: 1, textAlign: 'center', padding: '12px 0', cursor: 'pointer' }}
            onClick={() => window.open('https://yirmibes.com.tr/?gad_source=1', '_blank', 'noopener noreferrer')}
          >YAZILIM ÇÖZÜMLERİ</div>
        </div>
      </nav>
    </header>
  );
}

export default Header; 