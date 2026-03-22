/** @format */

import formatmoney from "../../utils/money";
import axios from "axios";
import { useState, useEffect } from "react";

function Product({ product, loadCart }) {
	const [quantity, setquantity] = useState(1);
	const [showAddedMessage, setShowAddedMessage] = useState(false);
	const [addedQuantity, setAddedQuantity] = useState(0);

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
		<div className="pt-10 pb-[25px] px-[25px] border-r border-b border-[rgb(240,240,240)] flex flex-col">
			{/* Product Image */}
			<div className="flex justify-center items-center h-[180px] mb-5">
				<img
					className="max-w-full max-h-full rounded-[5px]"
					src={product.image}
				/>
			</div>

			{/* Product Name */}
			<div className="min-h-[40px]. mb-[5px] limit-text-to-2-lines">
				{product.name}
			</div>

			{/* Rating */}
			<div className="flex items-center mb-[10px]">
				<img
					className="w-[100px] mr-[6px]"
					src={`images/ratings/rating-${product.rating.stars * 10}.png`}
				/>
				<div className="link-primary mt-[3px] cursor-auto">
					{product.rating.count}
				</div>
			</div>

			{/* Price */}
			<div className="font-bold mb-[10px]">
				{formatmoney(product.priceCents)}
			</div>

			{/* Quantity Selector */}
			<div className="mb-[17px]">
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

			{/* Spacer */}
			<div className="flex-1"></div>

			{/* Added to Cart Message */}
			{showAddedMessage && (
				<div
					className="text-[rgb(25,135,84)] text-[16px] flex items-center mb-[8px] opacity-100"
					style={{ animation: "slideIn 0.3s ease-in-out" }}>
					<img
						className="h-[19px] mr-[6px]"
						src="images/icons/checkmark.png"
						alt="Checkmark"
					/>
					{addedQuantity} {addedQuantity === 1 ? "item" : "items"} added
				</div>
			)}

			{/* Add to Cart Button */}
			<button
				className="button-primary w-full p-2 h-[34px] mt-[1px]"
				onClick={addTOcart}>
				Add to Cart
			</button>
		</div>
	);
}
export default Product;
