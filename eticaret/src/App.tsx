import { Routes, Route, useLocation } from 'react-router-dom';
import Header from "./components/Header";
import Products from "./components/Products";
import Login from './pages/Login';
import Register from './pages/Register';
import Nav from './components/Nav';
import Favorites from './pages/Favorites';
import Cart from './components/Cart';

function App() {
  const location = useLocation();
  const showProducts = location.pathname === '/';

  return (
    <>
      <div className="container mx-auto p-4">
        <Header/>
        <Nav/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/favorites" element={<Favorites/>}/>
          <Route path="./cart" element={<Cart/>}/>
        </Routes>
        {!showProducts ? null : <Products/>}
      </div>
     
    </>
  )
}

export default App
