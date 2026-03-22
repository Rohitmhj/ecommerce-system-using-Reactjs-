/** @format */

import formatmoney from "../../utils/money";

function CartItemsDetails({ cartItem, deleteItem, UpdateItem }) {
	return (
		<div>
			{/* Product Name */}
			<div className="font-bold mb-[8px]">{cartItem.product.name}</div>

			{/* Product Price */}
			<div className="font-bold mb-[5px]">
				{formatmoney(cartItem.product.priceCents)}
			</div>

			{/* Quantity Controls */}
			<div className="flex items-center gap-[8px]">
				<span>
					Quantity: <span className="font-medium">{cartItem.quantity}</span>
				</span>
				<span
					className="link-primary ml-[3px]"
					onClick={() => UpdateItem(cartItem.quantity + 1)}>
					Update
				</span>
				<span
					className="link-primary ml-[3px]"
					onClick={() => {
						if (cartItem.quantity > 1) {
							UpdateItem(cartItem.quantity - 1);
						} else {
							deleteItem();
						}
					}}>
					Reduce
				</span>
				<span
					className="link-primary ml-[3px]"
					onClick={deleteItem}>
					Delete
				</span>
			</div>
		</div>
	);
}

export default CartItemsDetails;
