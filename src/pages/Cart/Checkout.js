import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './Cart.module.css';

import { cartActions } from '../../store/cart-slice';

const Checkout = (props) => {
  const { isLoading, isSuccessfulOrder } = props;

  const [inputPhone, setInputPhone] = useState('');
  const [inputAddress, setInputAddress] = useState('');
  const [checked, setChecked] = useState(false);

  const cartList = useSelector((state) => state.cart.cartList);

  const dispatchFunction = useDispatch();

  const phoneChangeHandler = (event) => {
    setInputPhone(event.target.value);
  };

  const addresChangeHandler = (event) => {
    setInputAddress(event.target.value);
  };

  const chengeCheckbox = () => {
    setChecked(!checked);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (inputPhone && inputAddress && checked) {
      const formContentProductsList = [];
      cartList.map((item) => {
        const formContentProduct = {
          id: item.id,
          price: item.price,
          count: item.count,
        };
        formContentProductsList.push(formContentProduct);
      });

      const formContent = {
        owner: {
          phone: inputPhone,
          address: inputAddress,
        },
        items: [...formContentProductsList],
      };

      isLoading(true);
      try {
        const response = await fetch('http://localhost:7777/api/order', {
          method: 'POST',
          body: JSON.stringify(formContent),
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          throw new Error('Что-то пошло не так...');
        } else {
          isSuccessfulOrder();
        }
      } catch (error) {
        console.log(error);
      }
      isLoading(false);

      dispatchFunction(cartActions.cleaningCart());

      setInputPhone('');
      setInputAddress('');
      setChecked(false);
    }
  };

  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div className={`${styles['card__wrapper']} card`}>
        <form className="card-body" onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input
              className="form-control"
              id="phone"
              placeholder="Ваш телефон"
              value={inputPhone}
              onChange={phoneChangeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Адрес доставки</label>
            <input
              className="form-control"
              id="address"
              placeholder="Адрес доставки"
              value={inputAddress}
              onChange={addresChangeHandler}
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="agreement"
              checked={checked}
              onChange={chengeCheckbox}
            />
            <label className="form-check-label" htmlFor="agreement">
              Согласен с правилами доставки
            </label>
          </div>
          <button type="submit" className="btn btn-outline-secondary">
            Оформить
          </button>
        </form>
      </div>
    </section>
  );
};

export default Checkout;
