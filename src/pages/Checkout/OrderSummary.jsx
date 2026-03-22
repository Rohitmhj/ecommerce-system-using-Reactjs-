/** @format */

import dayjs from "dayjs";
import CartItemsDetails from "./cartItems-details";
import DeliveryOption from "./DeliveryOption";
import axios from "axios";

function OrderSummary({ deliveryOption, cart, loadCart }) {
	return (
		<div>
			{deliveryOption.length > 0 &&
				cart.map((cartItem) => {
					const selectedoption = deliveryOption.find(
						(deliveryoption) => deliveryoption.id === cartItem.deliveryOptionId,
					);
					const deleteItem = async () => {
						await axios.delete(`/api/cart-items/${cartItem.productId}`);
						await loadCart();
					};
					const UpdateItem = async (newquantity) => {
						await axios.put(`/api/cart-items/${cartItem.productId}`, {
							quantity: newquantity,
						});
						await loadCart();
					};

					return (
						<div
							key={cartItem.productId}
							className="border border-[rgb(222,222,222)] rounded-[4px] p-[18px] mb-[12px]">
							{/* Delivery Date */}
							<div className="text-[rgb(25,135,84)] font-bold text-[19px] mt-[5px] mb-[22px]">
								Delivery date:{" "}
								{dayjs(selectedoption.estimatedDeliveryTimeMs).format(
									"dddd, MMMM D",
								)}
							</div>

							{/* Cart Item Details Grid */}
							<div className="grid grid-cols-[100px_1fr_1fr] max-[1000px]:grid-cols-[100px_1fr] gap-x-[25px] max-[1000px]:gap-y-[30px]">
								<img
									className="max-w-full max-h-[120px] mx-auto"
									src={cartItem.product.image}
								/>
								<CartItemsDetails
									cartItem={cartItem}
									deleteItem={deleteItem}
									loadCart={loadCart}
									UpdateItem={UpdateItem}
								/>
								<DeliveryOption
									deliveryOption={deliveryOption}
									cartItem={cartItem}
									loadCart={loadCart}
								/>
							</div>
						</div>
					);
				})}
		</div>
	);
}

export default OrderSummary;
