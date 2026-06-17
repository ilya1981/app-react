import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { searchActions } from '../../store/search-slice';

import styles from './Catalog.module.css'

const CatalogSearch = () => {
  const searchValue = useSelector((state) => state.search.value);
  const [searchInputValue, setSearchInputValue] = useState(searchValue);
  const dispatchFunction = useDispatch();

  useEffect(() => {
    setSearchInputValue(searchValue);
  }, [searchValue]);

  const keyDownHandler = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault()
      dispatchFunction(searchActions.change(searchInputValue));
    }
  }

  const blurHandler = () => {
    dispatchFunction(searchActions.change(searchInputValue));
  }

  const changeInputHandler = (event) => {
    setSearchInputValue(event.target.value);
  };

  return (
    <form className={`${styles['catalog-search-form']} form-inline`}>
      <input className={`${styles['catalog-input']} form-control`} placeholder="Поиск" value={searchInputValue} onKeyDown={keyDownHandler} onBlur={blurHandler} onChange={changeInputHandler}/>
    </form>
  );
};

export default CatalogSearch;
