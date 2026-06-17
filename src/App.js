import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Catalog from './pages/Catalog/Catalog';
import About from './pages/About/About';
import Contacts from './pages/Contacts/Contacts';
import NotFound from './pages/NotFound/NotFound';
import Product from './pages/Product/Product';
import Layout from './components/Layout/Layout';
import Cart from './pages/Cart/Cart';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="catalog.html" element={<Catalog />} />
          <Route path="about.html" element={<About />} />
          <Route path="contacts.html" element={<Contacts />} />
          <Route path="catalog/:id.html" element={<Product />} />
          <Route path="cart.html" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
