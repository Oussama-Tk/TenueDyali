import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastContainer from './components/ToastContainer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';

import AdminLayout from './components/AdminLayout';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminMessages from './pages/admin/AdminMessages';

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Public Routes with Navbar and Footer */}
        <Route path="/" element={<div className="flex flex-col min-h-screen"><Navbar /><Home /><Footer /></div>} />
        <Route path="/shop" element={<div className="flex flex-col min-h-screen"><Navbar /><Shop /><Footer /></div>} />
        <Route path="/shop/:id" element={<div className="flex flex-col min-h-screen"><Navbar /><ProductDetail /><Footer /></div>} />
        <Route path="/about" element={<div className="flex flex-col min-h-screen"><Navbar /><About /><Footer /></div>} />
        <Route path="/contact" element={<div className="flex flex-col min-h-screen"><Navbar /><Contact /><Footer /></div>} />
        <Route path="/cart" element={<div className="flex flex-col min-h-screen"><Navbar /><Cart /><Footer /></div>} />
        <Route path="/login" element={<div className="flex flex-col min-h-screen"><Navbar /><Login /><Footer /></div>} />

        {/* Admin Routes without main Navbar and Footer */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<div className="text-3xl font-bold text-royal-green-900 bg-white p-8 rounded-xl shadow-sm">Bienvenue, Administrateur.<p className="text-gray-500 font-normal text-lg mt-2">Gérez vos produits et commandes depuis la barre latérale.</p></div>} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="messages" element={<AdminMessages />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
