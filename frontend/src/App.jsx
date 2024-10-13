import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './context/ProductContex';
import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './utils/ScroolTop';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Layout from './components/Layout';
import PageNotFound from './components/PageNotFound';
import Show from './components/Show';
import New from './components/New';
import Edit from './components/Edit';
import Category from './components/Category';
import Cart from './components/Cart'
import Orders from './components/Orders';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={<Login />} />
              <Route path="product/:id" element={<Show />} />
              <Route path="newProduct" element={<New />} />
              <Route path="edit/:id" element={<Edit />} />
              <Route path="category" element={<Category />} />
              <Route path="orders" element={<Orders/>} />
              <Route path="cart" element={<Cart/>} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
