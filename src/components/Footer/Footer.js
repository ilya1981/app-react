import FooterInfo from './FooterInfo';
import FooterPay from './FooterPay';
import FooterCopyright from './FooterCopyright';
import FooterContacts from './FooterContacts';

import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles['footer']}>
      <div className="container bg-light">
        <div className="row">
          <div className="col">
            <FooterInfo />
          </div>
          <div className="col">
            <FooterPay />
            <FooterCopyright />
          </div>
          <div className="col text-right">
            <FooterContacts />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
