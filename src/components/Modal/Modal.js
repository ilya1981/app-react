import React from 'react';
import ReactDOM from 'react-dom';

import styles from './Modal.module.css';

/**
 * Компонент отображающий слой полупрозрачной подложки. Родительский компонент Modal.
 *
 * @param {function} props.onHideCart Функция передает в компонент Modal запрос на изменение состояния скрытие корзины.
 */
const Backdrop = (props) => {
  const { onHideCart } = props;

  return <div className={styles['backdrop']} onClick={onHideCart}></div>;
};

/**
 * Компонент отображающий модальное окно. Родительский компонент Modal.
 *
 * @param {string} props.children Тексовое содежимое между открывающим и закрывающим тегом элемента.
 */
const ModalWindow = (props) => {
  const { children } = props;
  return (
    <div className={styles['modal']}>
      <div className={styles['content']}>{children}</div>
    </div>
  );
};

// Переменная определяющая точку портал в разметке файла index.html
const portalElement = document.getElementById('overlays');

/**
 * Компонент отображающий слой полупрозрачной подложки вместе с модальным окном. Родительский компонент Cart. Дочерние компоненты Backdrop (слой полупрозрачной подложки) и ModalWindow (модальное окно)
 *
 * @param {function} props.onHideCart Функция передает в компонент Cart запрос на изменение состояния скрытие корзины.
 * @param {string} props.children Тексовое содежимое между открывающим и закрывающим тегом элемента.
 */
const Modal = (props) => {
  const { onHideCart, children } = props;

  return (
    <React.Fragment>
      {/* Портируем элемент Backdrop в необходимую точку-порт */}
      {ReactDOM.createPortal(
        <Backdrop onHideCart={onHideCart} />,
        portalElement
      )}
      {/* Портируем элемент ModalWindow в необходимую точку-порт */}
      {ReactDOM.createPortal(
        <ModalWindow>{children}</ModalWindow>,
        portalElement
      )}
    </React.Fragment>
  );
};

export default Modal;