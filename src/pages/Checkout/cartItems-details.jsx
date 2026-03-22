/** @format */

import formatmoney from "../../utils/money";

function CartItemsDetails({ cartItem, deleteItem, UpdateItem }) {
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
				<span
					className="update-quantity-link link-primary"
					onClick={() => UpdateItem(cartItem.quantity + 1)}>
					Update
				</span>
				<span
					className="update-quantity-link link-primary"
					onClick={() => {
						if (cartItem.quantity > 1) {
							UpdateItem(cartItem.quantity - 1);
						} else {
							deleteItem();
						}
					}}>
					reduce
				</span>
				<span
					className="delete-quantity-link link-primary"
					onClick={deleteItem}>
					Delete
				</span>
			</div>
		</div>
	);
}
export default CartItemsDetails;
