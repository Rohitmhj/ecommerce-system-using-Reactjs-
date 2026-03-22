/** @format */

import axios from "axios";
import dayjs from "dayjs";
import formatmoney from "../../utils/money";

function DeliveryOption({ deliveryOption, cartItem, loadCart }) {
	return (
		<div className="max-[1000px]:col-span-2">
			<div className="font-bold mb-[10px]">Choose a delivery option:</div>
			{deliveryOption.map((deliveryoption) => {
				let pricestring = "FREE Shipping";
				if (deliveryoption.priceCents > 0) {
					pricestring = `${formatmoney(deliveryoption.priceCents)}-Shipping`;
				}
				const UpdateDeliveryoption = async () => {
					await axios.put(`/api/cart-items/${cartItem.productId}`, {
						deliveryOptionId: deliveryoption.id,
					});
					await loadCart();
				};

				return (
					<div
						key={deliveryoption.id}
						className="grid grid-cols-[24px_1fr] mb-[12px] cursor-pointer"
						onClick={UpdateDeliveryoption}>
						<input
							type="radio"
							checked={deliveryoption.id === cartItem.deliveryOptionId}
							onChange={() => {}}
							className="mt-[3px] mx-[5px] cursor-pointer"
							name={`delivery-option-${cartItem.productId}`}
						/>
						<div>
							<div className="font-medium mb-[3px]">
								{dayjs(deliveryoption.estimatedDeliveryTimeMs).format(
									"dddd, MMMM D",
								)}
							</div>
							<div className="text-[rgb(120,120,120)] text-[15px]">
								{pricestring}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default DeliveryOption;
