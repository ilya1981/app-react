import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Preloader from '../../components/Preloader/Preloader';
import ProductChoice from './ProductChoice';
import ProductAddBtn from './ProductAddBtn';
import { cartActions } from '../../store/cart-slice';

import styles from './Product.module.css';

const Product = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sizeSelected, setsizeSelected] = useState(null);
  const [isProductAvailability, setIsProductAvailability] = useState(false);

  const cartList = useSelector((state) => state.cart.cartList);

  const dispatchFunction = useDispatch();

  async function fetchProductHandler() {
    try {
      const response = await fetch(`http://localhost:7777/api/items/${id}`);
      if (!response.ok) {
        throw new Error('что-то пошло не так...');
      }
      const data = await response.json();

      const productSizes = data.sizes;
      productSizes.map((elem) => {
        if (elem.available) {
          setIsProductAvailability(true);
        }
      });

      setProduct(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetchProductHandler();
  }, [id]);

  const selectSizeHandler = (size) => {
    if (sizeSelected === size) {
      setsizeSelected(null);
    } else {
      setsizeSelected(size);
    }
  };

  const decreaseCountHandler = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increaseCountHandler = () => {
    if (count < 10) {
      setCount(count + 1);
    }
  };

  const addProductHandler = () => {
    if (cartList.length) {
      const updatedProduct = cartList.filter((value) => {
        return value.id === product.id && value.size === sizeSelected;
      });

      if (updatedProduct[0]) {
        const updateProduct = {
          id: product.id,
          count: count,
        };
        dispatchFunction(cartActions.addProduct(updateProduct));
        return;
      }
    }

    const newProduct = {
      id: product.id,
      name: product.title,
      size: sizeSelected,
      count: count,
      price: product.price,
    };
    dispatchFunction(cartActions.addNewProduct(newProduct));
  };

  return (
    <section className="catalog-item">
      {isLoading && <Preloader />}
      {error && (
        <p className="info">
          К сожалению при загрузке страницы {error}. Убедитесь в стабильном
          подключении
        </p>
      )}
      {product && (
        <>
          <h2 className="text-center">{product.title}</h2>
          <div className={`${styles['product__wrapper']} row`}>
            <div className="col-5">
              <img
                className="img-fluid"
                src={product.images[0]}
                alt={product.title}
              />
            </div>
            <div className={`${styles['product__content']} col-7`}>
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Артикул</td>
                    <td>{product.sku || ''}</td>
                  </tr>
                  <tr>
                    <td>Производитель</td>
                    <td>{product.manufacturer || ''}</td>
                  </tr>
                  <tr>
                    <td>Цвет</td>
                    <td>{product.color || ''}</td>
                  </tr>
                  <tr>
                    <td>Материалы</td>
                    <td>{product.material || ''}</td>
                  </tr>
                  <tr>
                    <td>Сезон</td>
                    <td>{product.season || ''}</td>
                  </tr>
                  <tr>
                    <td>Повод</td>
                    <td>{product.reason || ''}</td>
                  </tr>
                </tbody>
              </table>
              <ProductChoice
                sizes={product.sizes}
                count={count}
                sizeSelected={sizeSelected}
                isProductAvailability={isProductAvailability}
                selectSize={selectSizeHandler}
                decreaseCount={decreaseCountHandler}
                increaseCount={increaseCountHandler}
              />
              {isProductAvailability && (
                <ProductAddBtn
                  sizeSelected={sizeSelected}
                  addProduct={addProductHandler}
                />
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Product;
