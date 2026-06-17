import styles from './Footer.module.css';

const FooterCopyright = () => {
  return (
    <section>
      <div className={styles['footer-copyright']}>
        2009-2023 © BosaNoga.ru — модный интернет-магазин обуви и
        аксессуаров.Все права защищены.
        <br />
        Доставка по всей России!
      </div>
    </section>
  );
};

export default FooterCopyright;
