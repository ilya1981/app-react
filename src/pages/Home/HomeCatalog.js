import Categories from '../Catalog/Categories';
import CatalogList from '../Catalog/CatalogList';

import styles from './Home.module.css';

const HomeCatalog = () => {
  return (
    <section className={styles['catalog']}>
      <h2 className="text-center">Каталог</h2>
      <Categories />
      <CatalogList />
    </section>
  );
};

export default HomeCatalog;
