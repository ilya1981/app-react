import styles from './Catalog.module.css';
import CatalogSearch from './CatalogSearch';
import Categories from './Categories';
import CatalogList from './CatalogList';

const Catalog = () => {
  return (
    <section className={styles['catalog']}>
      <h2 className="text-center">Каталог</h2>
      <CatalogSearch />
      <Categories />
      <CatalogList />
    </section>
  );
};

export default Catalog;
