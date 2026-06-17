import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import GoodsList from './Goods/GoodsList';
import Preloader from '../../components/Preloader/Preloader';
import NotFoundIMG from './not-found.svg';
import ErrorIMG from './error.svg';

import styles from './Catalog.module.css';

const CatalogList = () => {
  const [goods, setGoods] = useState([]);
  const [goodsCount, setGoodsCount] = useState(6);
  const [isMoreGoods, setIsMoreGoods] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const activeCategory = useSelector((state) => state.category.value);
  const searchValue = useSelector((state) => state.search.value);

  let URL = 'http://localhost:7777/api/items';
  if (activeCategory !== 0 && searchValue === '') {
    URL = `http://localhost:7777/api/items?categoryId=${activeCategory}`;
  }
  if (activeCategory === 0 && searchValue !== '') {
    URL = `http://localhost:7777/api/items?q=${searchValue.toLowerCase()}`;
  }
  if (activeCategory !== 0 && searchValue !== '') {
    URL = `http://localhost:7777/api/items?categoryId=${activeCategory}&q=${searchValue.toLowerCase()}`;
  }

  let loadMoreURL = `http://localhost:7777/api/items?offset=${goodsCount}`;
  if (activeCategory !== 0) {
    loadMoreURL = `http://localhost:7777/api/items?categoryId=${activeCategory}&offset=${goodsCount}`;
  }

  async function fetchGoodsHandler(url) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Что-то пошло не так...');
      }
      const data = await response.json();
      setGoods(data);

      if (data.length < 6) {
        setIsMoreGoods(false);
      } else {
        setIsMoreGoods(true);
      }
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchGoodsHandler(URL);
  }, [activeCategory, searchValue]);

  const loadMoreHandler = () => {
    fetchGoodsHandler(loadMoreURL);
    setGoodsCount(goodsCount + 6);
    console.log(loadMoreURL);
  };

  let content = (
    <>
      <p className="info">
        По Вашему запросу ничего не найдено. Воспользуйтесь новым поисковым
        запросом или выберете другую категорию.
      </p>
      <img className="info-img" src={NotFoundIMG} alt="Not found" />
    </>
  );

  if (goods.length > 0) {
    content = <GoodsList goods={goods} />;
  }

  if (error) {
    content = (
      <>
        <p className="info">
          При выполнении запроса возникла ошибка: <b>"{error}"</b>
        </p>
        <img className="info-img" src={ErrorIMG} alt="Error" />
      </>
    );
  }

  if (isLoading) {
    content = <Preloader />;
  }

  return (
    <>
      {content}
      {isMoreGoods && (
        <div className="text-center">
          <button
            className={`${styles['load-more-btn']} btn btn-outline-primary`}
            onClick={loadMoreHandler}
          >
            Загрузить ещё
          </button>
        </div>
      )}
    </>
  );
};

export default CatalogList;
