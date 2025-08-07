
import { Routes, Route, useLocation, useParams } from 'react-router-dom';
import Header from "./components/Header";
import Products from "./components/Products";
import Login from './pages/Login';
import Register from './pages/Register';
import Nav from './components/Nav';
import Favorites from './pages/Favorites';
import CartPage from './pages/CartPage';
import Footer from './components/Footer.tsx';
import UserAddresses from './pages/UserAddresses.tsx';
import EditAddress from './pages/EditAddress.tsx';
import AddAddress from "./pages/AddAddress.tsx";





export function App() {
  const location = useLocation();


  const showProducts: boolean = location.pathname === '/';
  const EditAddressWrapper = () => {
    const { addressId, userId } = useParams();
    const parsedAddressId = addressId ? parseInt(addressId, 10) : 0;
    const parsedUserId = userId ? parseInt(userId, 8) : 0;

    return <EditAddress addressId={parsedAddressId} userId={parsedUserId} />;
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <Header />
        <Nav />

        <Routes>



          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cartpage" element={<CartPage />} />
          <Route path="/" element={<Products />} />
          <Route path="/addresses" element={<UserAddresses />} />
          <Route path="/edit-address/" element={<EditAddress />} />
          <Route path="/address/add" element={<AddAddress />} />
          <Route path="/profile" element={<CartPage />} />
          <Route path="/orders" element={<Login />} />
          <Route path="/edit-address/:userId/:addressId" element={<EditAddressWrapper />} />



        </Routes>
        {showProducts && <Products />}
      </div>
      <Footer />

    </>
  );
}




