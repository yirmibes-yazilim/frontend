
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from "./components/Header";
import Products from "./components/Products";
import Login from './pages/Login';
import Register from './pages/Register';
import Nav from './components/Nav';
import Favorites from './pages/Favorites';
import AdminLogin from './pages/AdminLogin';
import AdminHome from './pages/AdminHome';
import EmailConfirmationSend from "./pages/EmailConfirmationSend";
import EmailVerify from "./pages/EmailVerify";
import AdminProductsPage from './pages/AdminProductsPage';
import AdminLayout from './components/AdminLayout';
import AdminCategoriesPage from './pages/AdminCategoriesPage';
import Footer from './components/Footer';





function App() {
  const location = useLocation();
  const showProducts = location.pathname === '/';   //Products için anasayfa kontrolü
  const isAdminPage = location.pathname.startsWith('/admin/');   //Admin sayfası mı 

  return (
    <>
      <div className="container mx-auto p-4">

        {/* Admin sayfalarında Header ve Nav gösterme */}
        {!isAdminPage && <Header />}
        {!isAdminPage && <Nav />}

        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/favorites" element={<Favorites/>}/>
          <Route path="/send-confirmation/:userId" element={<EmailConfirmationSend />} />
          <Route path="/verify-email" element={<EmailVerify />} />
          

          <Route path="/admin/login" element={<AdminLogin/>}/>

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="home" element={<AdminHome />} />
            <Route path="adminproducts" element={<AdminProductsPage />} />
            <Route path="admincategories" element={<AdminCategoriesPage/>} />
          
          </Route>
          
           
            
            
          
          
        </Routes>
        {showProducts && <Products />}
        {showProducts && <Footer />}
      </div>
     
    </>
  )
}

export default App

