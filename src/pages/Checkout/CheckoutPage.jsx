/** @format */

import axios from "axios";
import { useEffect, useState } from "react";
import PaymentSummary from "./PaymentSummary";
import OrderSummary from "./OrderSummary";
import { Link } from "react-router";

function CheckoutPage({ cart, loadCart, loadOrders }) {
	const [deliveryOption, setDeliveryOption] = useState([]);
	const [paymentSummary, setpaymentsummary] = useState(null);

	const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

	useEffect(() => {
		const fetchCheckoutData = async () => {
			let response = await axios.get(
				"/api/delivery-options?expand=estimatedDeliveryTime",
			);
			setDeliveryOption(response.data);
		};
		fetchCheckoutData();
	}, []);

	useEffect(() => {
		const ordersummary = async () => {
			let response = await axios.get("/api/payment-summary");
			setpaymentsummary(response.data);
		};
		ordersummary();
	}, [cart]);

	return (
		<>
			<title>Checkout Page</title>

			{/* Checkout Header */}
			<div className="h-[60px] px-[30px] bg-white flex justify-center fixed top-0 left-0 right-0 z-[1000]">
				<div className="w-full max-w-[1100px] flex items-center">
					{/* Left Section */}
					<div className="w-[200px] max-[575px]:w-auto">
						<Link
							to="/"
							className="no-underline">
							<div className="flex items-center gap-2 whitespace-nowrap">
								<span className="text-[28px]">🏪</span>
								<span className="text-[24px] font-bold text-[rgb(8,79,45)] tracking-wide max-[575px]:hidden">
									General Store
								</span>
							</div>
						</Link>
					</div>

					{/* Middle Section */}
					<div className="flex-1 text-center text-[22px] font-medium flex justify-center max-[1000px]:text-[20px] max-[1000px]:mr-[60px] max-[575px]:mr-[5px]">
						Checkout (
						<a
							className="text-[rgb(25,135,84)] no-underline cursor-pointer"
							href="/">
							{totalItems} {totalItems === 1 ? "item" : "items"}
						</a>
						)
					</div>

					{/* Right Section */}
					<div className="w-[200px] text-right flex items-center justify-end max-[1000px]:w-auto">
						<img
							className="h-[32px]"
							src="images/icons/checkout-lock-icon.png"
						/>
					</div>
				</div>
			</div>

			{/* Checkout Page */}
			<div className="max-w-[1100px] px-[30px] mt-[140px] mb-[100px] mx-auto">
				<div className="font-bold text-[22px] mb-[18px]">Review your order</div>

				<div className="grid grid-cols-[1fr_350px] max-[1000px]:grid-cols-1 gap-x-[12px] items-start">
					<OrderSummary
						deliveryOption={deliveryOption}
						cart={cart}
						loadCart={loadCart}
					/>
					<PaymentSummary
						paymentSummary={paymentSummary}
						loadCart={loadCart}
						loadOrders={loadOrders}
					/>
				</div>
			</div>
		</>
	);
}

export default CheckoutPage;
