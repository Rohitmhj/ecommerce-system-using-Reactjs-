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
		<div className="border border-[rgb(222,222,222)] rounded-[4px] p-[18px] pb-[5px] max-[1000px]:row-start-1 max-[1000px]:mb-[12px]">
			<div className="font-bold text-[18px] mb-[12px]">Payment Summary</div>

			{paymentSummary && (
				<>
					{/* Items */}
					<div className="grid grid-cols-[1fr_auto] text-[15px] mb-[9px]">
						<div>Items ({paymentSummary.totalItems}):</div>
						<div className="text-right">
							{formatmoney(paymentSummary.productCostCents)}
						</div>
					</div>

					{/* Shipping */}
					<div className="grid grid-cols-[1fr_auto] text-[15px] mb-[9px]">
						<div>Shipping &amp; handling:</div>
						<div className="text-right">
							{formatmoney(paymentSummary.shippingCostCents)}
						</div>
					</div>

					{/* Subtotal */}
					<div className="grid grid-cols-[1fr_auto] text-[15px] mb-[9px]">
						<div className="pt-[9px] border-t border-[rgb(222,222,222)]">
							Total before tax:
						</div>
						<div className="text-right pt-[9px] border-t border-[rgb(222,222,222)]">
							{formatmoney(paymentSummary.totalCostBeforeTaxCents)}
						</div>
					</div>

					{/* Tax */}
					<div className="grid grid-cols-[1fr_auto] text-[15px] mb-[9px]">
						<div>Estimated tax (10%):</div>
						<div className="text-right">
							{formatmoney(paymentSummary.taxCents)}
						</div>
					</div>

					{/* Total */}
					<div className="grid grid-cols-[1fr_auto] text-[rgb(25,135,84)] font-bold text-[18px] border-t border-[rgb(222,222,222)] pt-[18px] mb-[9px]">
						<div>Order total:</div>
						<div className="text-right">
							{formatmoney(paymentSummary.totalCostCents)}
						</div>
					</div>

					{/* Place Order Button */}
					<button
						className="button-primary w-full py-[12px] rounded-[5px] mt-[20px] mb-[19px]"
						onClick={createorder}>
						Place your order
					</button>
				</>
			)}
		</div>
	);
}

export default PaymentSummary;
