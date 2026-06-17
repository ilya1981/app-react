import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { searchActions } from '../../store/search-slice';

import styles from './Header.module.css';

const HeaderControls = () => {
  const [searchInputValue, setSearchInputValue] = useState('');

  const isSearchOpen = useSelector((state) => state.search.open);
  const numberOfUnits = useSelector((state) => state.cart.numberOfUnits);

  const isSearchValue =
    isSearchOpen && searchInputValue.trim().length ? true : false;
  const isSearchNotValue =
    isSearchOpen && !searchInputValue.trim().length ? true : false;

  const dispatchFunction = useDispatch();

  const searchHandler = () => {
    if (!isSearchOpen) {
      dispatchFunction(searchActions.open());
    } else {
      if (searchInputValue.trim().length) {
        dispatchFunction(searchActions.change(searchInputValue));
        setSearchInputValue('');
        dispatchFunction(searchActions.close());
      } else {
        dispatchFunction(searchActions.close());
      }
    }
  };

  const changeInputHandler = (event) => {
    setSearchInputValue(event.target.value);
  };

  const searchElement = (
    <div
      data-id="search-expander"
      className={`${styles['header-controls-pic']} ${styles['header-controls-search']}`}
      onClick={searchHandler}
    ></div>
  );

  return (
    <div>
      <div className={styles['header-controls-pics']}>
        {!isSearchOpen && searchElement}
        {isSearchNotValue && searchElement}
        {isSearchValue && <Link to="/catalog.html">{searchElement}</Link>}
        <Link to="/cart.html">
          <div
            className={`${styles['header-controls-pic']} ${styles['header-controls-cart']}`}
          >
            {!!numberOfUnits && <div className={styles['header-controls-cart-full']}>{numberOfUnits}</div>}
            <div className={styles['header-controls-cart-menu']}></div>
          </div>
        </Link>
      </div>
      <form
        data-id="search-form"
        className={
          !isSearchOpen
            ? `${styles['header-controls-search-form']} form-inline invisible`
            : `${styles['header-controls-search-form']} form-inline`
        }
      >
        <input
          className={`${styles['header-controls-form-control']} form-control`}
          placeholder="Поиск"
          onChange={changeInputHandler}
          value={searchInputValue}
        />
      </form>
    </div>
  );
};

export default HeaderControls;
