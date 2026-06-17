import { Link } from 'react-router-dom';

import HeaderNavbar from './HeaderNavbar';
import HeaderControls from './HeaderControls';

import logo from './header-logo.png'
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles['header']}>
      <div className="container">
        <div className="row">
          <div className="col">
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
              <Link className="navbar-brand" to="/">
                <img src={logo} alt="Bosa Noga" />
              </Link>
              <div className="collapse navbar-collapse" id="navbarMain">
                <HeaderNavbar />
                <HeaderControls />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
