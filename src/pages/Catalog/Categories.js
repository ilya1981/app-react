import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { categoryActions } from '../../store/active-category-slice';
import Preloader from '../../components/Preloader/Preloader';

import styles from './Catalog.module.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatchFunction = useDispatch();
  const activeCategory = useSelector((state) => state.category.value);

  const isVisibleCategoriesBlock =
    !isLoading && !error && categories.length ? true : false;

  async function fetchCategoriesHandler() {
    try {
      const response = await fetch(`http://localhost:7777/api/categories`);
      if (!response.ok) {
        throw new Error('Что-то пошло не так...');
      }
      const data = await response.json();

      setCategories(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetchCategoriesHandler();
  }, []);

  const categoryChangeHandler = (id) => {
    dispatchFunction(categoryActions.change(id));
  };

  const elements = categories
    ? categories.map((element) => {
        return (
          <li className="nav-item" key={element.id} id={element.id}>
            <button
              className={
                activeCategory === element.id ? 'nav-link active' : 'nav-link'
              }
              onClick={() => categoryChangeHandler(element.id)}
            >
              {element.title}
            </button>
          </li>
        );
      })
    : '';

  return (
    <>
      {isLoading && <Preloader />}
      {isVisibleCategoriesBlock && (
        <ul
          className={`${styles['catalog-categories']} nav justify-content-center categories`}
        >
          <li className="nav-item">
            <button
              className={activeCategory === 0 ? 'nav-link active' : 'nav-link'}
              onClick={() => categoryChangeHandler(0)}
            >
              Все
            </button>
          </li>
          {isLoading && <Preloader />}
          {elements}
        </ul>
      )}
    </>
  );
};

export default Categories;
