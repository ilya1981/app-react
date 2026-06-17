const CartProductItem = (props) => {
  const { id, index, name, size, count, price, totalCost, delCartItem } = props;
  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>
        <a href="/products/1.html">{name}</a>
      </td>
      <td>{size}</td>
      <td>{count}</td>
      <td>{price}</td>
      <td>{totalCost}</td>
      <td>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => delCartItem(id, totalCost)}
        >
          Удалить
        </button>
      </td>
    </tr>
  );
};

export default CartProductItem;
