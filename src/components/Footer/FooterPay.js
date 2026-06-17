import styles from './Footer.module.css'

const FooterPay = () => {
  return (
    <section>
      <h5>Принимаем к оплате:</h5>
      <div className={styles['footer-pay']}>
        <div className={`${styles['footer-pay-systems']} ${styles['footer-pay-systems-paypal']}`}></div>
        <div className={`${styles['footer-pay-systems']} ${styles['footer-pay-systems-master-card']}`}></div>
        <div className={`${styles['footer-pay-systems']} ${styles['footer-pay-systems-visa']}`}></div>
        <div className={`${styles['footer-pay-systems']} ${styles['footer-pay-systems-yandex']}`}></div>
        <div className={`${styles['footer-pay-systems']} ${styles['footer-pay-systems-webmoney']}`}></div>
        <div className={`${styles['footer-pay-systems']} ${styles['footer-pay-systems-qiwi']}`}></div>
      </div>
    </section>
  );
};

export default FooterPay;
