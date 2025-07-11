import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import Favorites from './Favorites';
import Cart from './Cart';
import Iletisim from './Iletisim';
import { AuthProvider } from './AuthContext';

function AppContent() {
  return (
    <>
      {/* Ana içerik buraya eklenebilir */}
    </>
  );
}

function LoginFooter({ onRegisterClick, onSuccess }) {
  return (
    <div>
      <Login onSuccess={onSuccess} />
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <span>Hesabınız yok mu? </span>
        <button onClick={onRegisterClick} style={{ color: '#00a6eb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontWeight: 500 }}>
          Kayıt Ol
        </button>
      </div>
    </div>
  );
}

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleAccountClick = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleCloseModal = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <AuthProvider>
      <Router>
        <Header onAccountClick={handleAccountClick} />
        {(showLogin || showRegister) && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 16px rgba(0,0,0,0.2)', minWidth: 350, minHeight: 300, position: 'relative', padding: 24 }}>
              <button onClick={handleCloseModal} style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer' }}>&times;</button>
              {showLogin && <LoginFooter onRegisterClick={handleRegisterClick} onSuccess={handleCloseModal} />}
              {showRegister && <Register onClose={handleCloseModal} />}
            </div>
          </div>
        )}
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/favoriler" element={<Favorites />} />
          <Route path="/sepetim" element={<Cart />} />
          <Route path="/iletisim" element={<Iletisim />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;


