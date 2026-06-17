import { Outlet } from 'react-router-dom';

import Header from '../Header/Header';
import Bunner from '../Bunner/Bunner';
import Footer from '../Footer/Footer';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="container">
        <div className="row">
          <div className="col">
            <Bunner />
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
