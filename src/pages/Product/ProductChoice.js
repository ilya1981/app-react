import styles from './Product.module.css';

const ProductChoice = (props) => {
  const {
    sizes,
    count,
    sizeSelected,
    isProductAvailability,
    selectSize,
    decreaseCount,
    increaseCount,
  } = props;

  return (
    <div className="text-center">
      <p>
        Размеры в наличии:{' '}
        {sizes.map((elem) => {
          if (elem.available) {
            return (
              <span
                className={
                  sizeSelected === elem.size
                    ? `${styles['product__item-size']} ${styles['selected']}`
                    : `${styles['product__item-size']}`
                }
                key={elem.size}
                onClick={() => selectSize(elem.size)}
              >
                {elem.size}{' '}
              </span>
            );
          }
        })}
      </p>
      {isProductAvailability && (
        <p>
          Количество:{' '}
          <span className="btn-group btn-group-sm pl-2">
            <button
              className="btn btn-secondary"
              onClick={decreaseCount}
            >
              -
            </button>
            <span className="btn btn-outline-primary">{count}</span>
            <button
              className="btn btn-secondary"
              onClick={increaseCount}
            >
              +
            </button>
          </span>
        </p>
      )}
    </div>
  );
};

export default ProductChoice;
