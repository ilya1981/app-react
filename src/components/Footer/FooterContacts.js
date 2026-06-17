import styles from './Footer.module.css'

const FooterContacts = () => {
  return (
    <section className={styles['footer-contacts']}>
      <h5>Контакты:</h5>
      <a className={styles['footer-contacts-phone']} href="tel:+7-495-790-35-03">
        +7 495 79 03 5 03
      </a>
      <span className={styles['footer-contacts-working-hours']}>
        Ежедневно: с 09-00 до 21-00
      </span>
      <a className={styles['footer-contacts-email']} href="mailto:office@bosanoga.ru">
        office@bosanoga.ru
      </a>
      <div className={styles['footer-social-links']}>
        <div className={`${styles['footer-social-link']} ${styles['footer-social-link-twitter']}`}></div>
        <div className={`${styles['footer-social-link']} ${styles['footer-social-link-vk']}`}></div>
      </div>
    </section>
  );
};

export default FooterContacts;
