/** @format */

import formatmoney from "../../utils/money";
import axios from "axios";
import { useNavigate } from "react-router";
function PaymentSummary({ paymentSummary, loadCart, loadOrders }) {
	const navigate = useNavigate();

	const createorder = async () => {
		await axios.post("/api/orders");
		await loadCart();
		await loadOrders();
		navigate("/orders");
	};
	return (
		<div className="payment-summary">
			<div className="payment-summary-title">Payment Summary</div>
			{paymentSummary && (
				<>
					<div className="payment-summary-row">
						<div>Items ({paymentSummary.totalItems}):</div>
						<div className="payment-summary-money">
							{formatmoney(paymentSummary.productCostCents)}
						</div>
					</div>

					<div className="payment-summary-row">
						<div>Shipping &amp; handling:</div>
						<div className="payment-summary-money">
							{formatmoney(paymentSummary.shippingCostCents)}
						</div>
					</div>

					<div className="payment-summary-row subtotal-row">
						<div>Total before tax:</div>
						<div className="payment-summary-money">
							{formatmoney(paymentSummary.totalCostBeforeTaxCents)}
						</div>
					</div>

					<div className="payment-summary-row">
						<div>Estimated tax (10%):</div>
						<div className="payment-summary-money">
							{formatmoney(paymentSummary.taxCents)}
						</div>
					</div>

					<div className="payment-summary-row total-row">
						<div>Order total:</div>
						<div className="payment-summary-money">
							{formatmoney(paymentSummary.totalCostCents)}
						</div>
					</div>

					<button
						className="place-order-button button-primary"
						onClick={createorder}>
						Place your order
					</button>
				</>
			)}
		</div>
	);
}
export default PaymentSummary;
