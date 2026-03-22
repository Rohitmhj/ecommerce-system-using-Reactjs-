/**
 * eslint-disable react/prop-types
 *
 * @format
 */

import axios from "axios";
import { useEffect, useState } from "react";
import PaymentSummary from "./PaymentSummary";
import "./Checkout.css";
import "./checkout-header.css";
import OrderSummary from "./OrderSummary";
import { Link } from "react-router";

function CheckoutPage({ cart, loadCart, loadOrders }) {
	const [deliveryOption, setDeliveryOption] = useState([]);
	const [paymentSummary, setpaymentsummary] = useState(null);

	// Calculate total items in cart
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
			<div className="checkout-header">
				<div className="header-content">
					<div className="checkout-header-left-section">
						<Link
							to="/"
							className="header-link">
							<div className="store-logo-container">
								<span className="store-logo-icon">🏪</span>
								<span className="store-logo-text">General Store</span>
							</div>
						</Link>
					</div>

					<div className="checkout-header-middle-section">
						Checkout (
						<a
							className="return-to-home-link"
							href="/">
							{totalItems} {totalItems === 1 ? "item" : "items"}
						</a>
						)
					</div>

					<div className="checkout-header-right-section">
						<img src="images/icons/checkout-lock-icon.png" />
					</div>
				</div>
			</div>

			<div className="checkout-page">
				<div className="page-title">Review your order</div>

				<div className="checkout-grid">
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
