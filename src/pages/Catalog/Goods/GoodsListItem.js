import { Link } from 'react-router-dom';

import styles from './Goods.module.css'

const GoodsListItem = (props) => {
  return (
    <div className={`${styles['goods__item-wrapper']} col-4`}>
      <div className={`${styles['goods__card']} card catalog-item-card`}>
        <img
          className="card-img-top img-fluid"
          src={props.images}
          alt={props.title}
        />
        <div className={`${styles['goods__card-body']} card-body`}>
          <p className="card-text">{props.title}</p>
          <p className="card-text">{props.price} руб.</p>
          <Link className="btn btn-outline-primary" to={`/catalog/${props.id}.html`}>
            Заказать
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GoodsListItem;
