import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import { cartActions } from '../../store/cart-slice';
import CartProductItem from './CartProductItem';
import Checkout from './Checkout';
import Preloader from '../../components/Preloader/Preloader';
import Modal from '../../components/Modal/Modal';
import CartImg from './cart.svg';
import CartEmptyImg from './cart-empty.svg';

const Cart = () => {
  const cartList = useSelector((state) => state.cart.cartList);
  const totalCost = useSelector((state) => state.cart.totalCost);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessfulOrder, setIsSuccessfulOrder] = useState(false);
  const [isModal, setIsModal] = useState(true);

  const dispatchFunction = useDispatch();

  const delCartItemHandler = (id, totalCost) => {
    dispatchFunction(cartActions.delProduct({ id: id, totalCost: totalCost }));
  };

  const changeLoadingHandler = (value) => {
    setIsLoading(value);
  };

  const changeSuccessfulOrderHandler = () => {
    setIsSuccessfulOrder(true);
    setIsModal(true);
    console.log('message');
  };

  const closeModalHandler = () => {
    setIsModal(false);
    setIsSuccessfulOrder(false);
  };

  const productCartElements = cartList.map((element, index) => {
    return (
      <CartProductItem
        index={index}
        key={element.id}
        id={element.id}
        name={element.name}
        size={element.size}
        count={element.count}
        price={element.price}
        totalCost={element.totalCost}
        delCartItem={delCartItemHandler}
      />
    );
  });

  return (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        {!cartList.length && (
          <>
            <p className="info">Ваша корзина пока пуста</p>
            <img className="info-img" src={CartEmptyImg} alt="Cart" />
          </>
        )}
        {!!cartList.length && (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Название</th>
                <th scope="col">Размер</th>
                <th scope="col">Кол-во</th>
                <th scope="col">Стоимость</th>
                <th scope="col">Итого</th>
                <th scope="col">Действия</th>
              </tr>
            </thead>
            <tbody>
              {productCartElements}
              <tr>
                <td className="text-right" colSpan="5">
                  Общая стоимость
                </td>
                <td>{totalCost} руб.</td>
              </tr>
            </tbody>
          </table>
        )}
      </section>
      {!!cartList.length && (
        <Checkout
          isLoading={changeLoadingHandler}
          isSuccessfulOrder={changeSuccessfulOrderHandler}
        />
      )}
      {isLoading && <Preloader />}
      {!!isSuccessfulOrder && !!isModal && (
        <Modal>
          <p className="info">Ваш заказ оформлен успешно! Спасибо за покупку!</p>
          <img className="info-img" src={CartImg} alt="Cart" />
          <button
            className="btn btn-outline-primary"
            onClick={closeModalHandler}
          >
            Закрыть
          </button>
        </Modal>
      )}
    </>
  );
};

export default Cart;
