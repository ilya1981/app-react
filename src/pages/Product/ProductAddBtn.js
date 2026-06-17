import { Link } from 'react-router-dom';

import styles from './Product.module.css';

const ProductAddBtn = (props) => {
  const { sizeSelected, addProduct } = props;
  return (
    <>
      {!!sizeSelected && (
        <Link to="/cart.html">
          <button
            className={`${styles['product__btn']} btn btn-danger btn-block btn-lg`}
            onClick={addProduct}
          >
            В корзину
          </button>
        </Link>
      )}

      {!sizeSelected && (
        <button
          className={`${styles['product__btn']} btn btn-danger btn-block btn-lg`}
          disabled
        >
          В корзину
        </button>
      )}
    </>
  );
};

export default ProductAddBtn;
