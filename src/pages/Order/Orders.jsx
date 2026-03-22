/** @format */

import dayjs from "dayjs";
import formatmoney from "../../utils/money";
import "./orders.css";
import Header from "../../Components/Header";
import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router";
import Track from "./Track";
import { getImageUrl } from "../../utils/imageLoader";

function Orders({ cart, order, loadCart  }) {
	const navigate = useNavigate();

	const handleBuyAgain = async (product) => {
		try {
			const productId = product.product?.id || product.id;
			const quantity = product.quantity || 1;

			

			await axios.post(`/api/cart-items`, {
				productId: productId,
				quantity: quantity,
			});

			await loadCart();
			navigate("/checkout");
		} catch (error) {
			console.error(
				"Error adding to cart:",
				error.response?.data || error.message,
			);
		}
	};

	return (
		<>
			<title>orders</title>
			<Header cart={cart} />

			<div className="orders-page">
				<div className="page-title">Your Orders</div>

				<div className="orders-grid">
					{order.map((orders) => {
						return (
							<div
								key={orders.id}
								className="order-container">
								<div className="order-header">
									<div className="order-header-left-section">
										<div className="order-date">
											<div className="order-header-label">Order Placed:</div>
											<div>{dayjs(orders.orderTimeMs).format("MMMM D")}</div>
										</div>
										<div className="order-total">
											<div className="order-header-label">Total:</div>
											<div>{formatmoney(orders.totalCostCents)}</div>
										</div>
									</div>

									<div className="order-header-right-section">
										<div className="order-header-label">Order ID:</div>
										<div>{orders.id}</div>
									</div>
								</div>

								<div className="order-details-grid">
									{orders.products.map((orderProduct) => {
										let totalquantity = 0;
										totalquantity += orderProduct.quantity;
										return (
											<Fragment key={orderProduct.id}>
												<div className="product-image-container">
													<img
														src={getImageUrl(
															orderProduct.product?.image || orderProduct.image,
														)}
														alt={orderProduct.name}
													/>
												</div>
												<div className="product-details">
													<div className="product-name">
														{orderProduct.name}
													</div>
													<div className="product-delivery-date">
														{`Arriving on: ${dayjs(
															orderProduct.estimatedDeliveryTimeMs,
														).format("MMMM D")}`}
													</div>
													<div className="product-quantity">{`Quantity: ${totalquantity}`}</div>
													<button
														className="buy-again-button button-primary"
														onClick={() => handleBuyAgain(orderProduct)}>
														<img
															className="buy-again-icon"
															src={getImageUrl("images/icons/buy-again.png")}
															alt="Buy Again"
														/>
														<span className="buy-again-message">Buy Again</span>
													</button>
												</div>
												<Track productId={orders.id} />
											</Fragment>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
export default Orders;
