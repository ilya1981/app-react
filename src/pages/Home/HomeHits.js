import React, { useState, useEffect, useCallback } from 'react';

import GoodsList from '../Catalog/Goods/GoodsList';
import Preloader from '../../components/Preloader/Preloader';

const HomeHits = () => {
  const [hits, setHits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  let isDisplaySection =
    hits !== null && hits !== undefined && hits.length > 0 ? true : false;

  const fetchHitsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:7777/api/top-sales');
      if (!response.ok) {
        throw new Error('Что-то пошло не так...');
      }
      const data = await response.json();
      setHits(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchHitsHandler();
  }, [fetchHitsHandler]);

  let content = <GoodsList goods={hits} />;

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <Preloader />;
  }

  return (
    <>
      {isDisplaySection && (
        <section className="top-sales">
          <h2 className="text-center">Хиты продаж!</h2>
          {content}
        </section>
      )}
    </>
  );
};

export default HomeHits;
