import formatmoney from "../../utils/money";

function CartItemsDetails({cartItem,deleteItem})
 {
     
  return (
    <div className="cart-item-details">
      <div className="product-name">{cartItem.product.name}</div>
      <div className="product-price">
        {formatmoney(cartItem.product.priceCents)}
      </div>
      <div className="product-quantity">
        <span>
          Quantity: <span className="quantity-label">{cartItem.quantity}</span>
        </span>
        <span className="update-quantity-link link-primary">Update</span>
        <span  className="delete-quantity-link link-primary" onClick={deleteItem}>
          Delete</span>
      </div>
    </div>
  );
}
export default CartItemsDetails;
