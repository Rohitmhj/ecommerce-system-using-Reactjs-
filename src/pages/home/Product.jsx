/** @format */

import formatmoney from "../../utils/money";
import axios from "axios";
import { useState, useEffect } from "react";

function Product({ product, loadCart }) {
	const [quantity, setquantity] = useState(1);
	const [showAddedMessage, setShowAddedMessage] = useState(false);
	const [addedQuantity, setAddedQuantity] = useState(0);

	// Auto-hide the "Added" message after 2 seconds
	useEffect(() => {
		if (showAddedMessage) {
			const timer = setTimeout(() => {
				setShowAddedMessage(false);
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [showAddedMessage]);

	const addTOcart = async () => {
		await axios.post("/api/cart-items", {
			productId: product.id,
			quantity,
		});
		setAddedQuantity(quantity);
		setShowAddedMessage(true);
		await loadCart();
	};

	const selectquantities = (event) => {
		const selectedQuantity = Number(event.target.value);
		setquantity(selectedQuantity);
	};

	return (
		<div
			key={product.id}
			className="product-container">
			<div className="product-image-container">
				<img
					className="product-image"
					src={product.image}
				/>
			</div>

			<div className="product-name limit-text-to-2-lines">{product.name}</div>

			<div className="product-rating-container">
				<img
					className="product-rating-stars"
					src={`images/ratings/rating-${product.rating.stars * 10}.png`}
				/>
				<div className="product-rating-count link-primary">
					{product.rating.count}
				</div>
			</div>

			<div className="product-price">{formatmoney(product.priceCents)}</div>

			<div className="product-quantity-container">
				<select
					value={quantity}
					onChange={selectquantities}>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
					<option value="6">6</option>
					<option value="7">7</option>
					<option value="8">8</option>
					<option value="9">9</option>
					<option value="10">10</option>
				</select>
			</div>

			<div className="product-spacer"></div>

			{showAddedMessage && (
				<div className="added-to-cart">
					<img
						src="images/icons/checkmark.png"
						alt="Checkmark"
					/>
					{addedQuantity} {addedQuantity === 1 ? "item" : "items"} added
				</div>
			)}

			<button
				className="add-to-cart-button button-primary"
				onClick={addTOcart}>
				Add to Cart
			</button>
		</div>
	);
}
export default Product;
