/** @format */

import "./tracking.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import dayjs from "dayjs";
import Header from "../Components/Header";
import {
	getImageUrl,
	handleImageError,
	handleImageLoad,
} from "../utils/imageLoader";

function Tracking({ order, cart }) {
	const { orderId } = useParams();
	const [trackingData, setTrackingData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchTrackingData = async () => {
			try {
				setLoading(true);
				let data = null;

				// If orderId is provided in URL, fetch that specific order
				if (orderId) {
					const response = await axios.get(
						`/api/orders/${orderId}?expand=products`,
					);
					data = response.data;
				}
				// Otherwise, use the first order from the orders array
				else if (order && order.length > 0) {
					data = order[0];
				}

				setTrackingData(data);
				setError(null);
			} catch (err) {
				setError("Failed to load tracking information");
				console.error("Tracking error:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchTrackingData();
	}, [orderId, order]);

	// Calculate progress based on delivery status
	const getProgressInfo = (estimatedDeliveryMs) => {
		const deliveryDate = dayjs(estimatedDeliveryMs);
		const today = dayjs();
		const daysUntilDelivery = deliveryDate.diff(today, "day");

		if (daysUntilDelivery > 1) {
			return { status: "Preparing", progress: 25 };
		} else if (daysUntilDelivery > 0) {
			return { status: "Shipped", progress: 65 };
		} else if (daysUntilDelivery === 0) {
			return { status: "Arriving Today", progress: 90 };
		} else {
			return { status: "Delivered", progress: 100 };
		}
	};

	const isStatusActive = (statusName, currentStatus) => {
		const statuses = ["Preparing", "Shipped", "Arriving Today", "Delivered"];
		const currentIndex = statuses.indexOf(currentStatus);
		const statusIndex = statuses.indexOf(statusName);
		return statusIndex <= currentIndex;
	};

	if (loading) {
		return (
			<>
				<Header cart={cart} />
				<div className="tracking-page">
					<div className="order-tracking">
						<div className="loading-message">
							Loading tracking information...
						</div>
					</div>
				</div>
			</>
		);
	}

	if (error || !trackingData) {
		return (
			<>
				<Header cart={cart} />
				<div className="tracking-page">
					<div className="order-tracking">
						<a
							className="back-to-orders-link link-primary"
							href="/orders">
							View all orders
						</a>
						<div className="error-message">
							{error || "No tracking data available"}
						</div>
					</div>
				</div>
			</>
		);
	}

	// Get first product for display (you can modify to show all products)
	const product = trackingData.products?.[0];
	const progressInfo =
		product ?
			getProgressInfo(product.estimatedDeliveryTimeMs)
		:	{ status: "Unknown", progress: 0 };

	// Get image - try product.product.image first, then fallback to product.image
	const rawProductImage = product?.product?.image || product?.image;
	const productImage = getImageUrl(rawProductImage);

	return (
		<>
			<title>Tracking</title>
			<Header cart={cart} />

			<div className="tracking-page">
				<div className="order-tracking">
					<a
						className="back-to-orders-link link-primary"
						href="/orders">
						View all orders
					</a>

					{product && (
						<>
							<div className="delivery-date">
								Arriving on{" "}
								{dayjs(product.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
							</div>

							<div className="product-info">{product.name}</div>

							<div className="product-info">Quantity: {product.quantity}</div>

							{productImage && (
								<img
									className="product-image"
									src={productImage}
									alt={product.name}
									onError={(e) => handleImageError(e)}
									onLoad={(e) => handleImageLoad(e.target.src)}
								/>
							)}
						</>
					)}

					<div className="progress-labels-container">
						<div
							className={`progress-label ${isStatusActive("Preparing", progressInfo.status) ? "active" : ""} ${progressInfo.status === "Preparing" ? "current-status" : ""}`}>
							Preparing
						</div>
						<div
							className={`progress-label ${isStatusActive("Shipped", progressInfo.status) ? "active" : ""} ${progressInfo.status === "Shipped" ? "current-status" : ""}`}>
							Shipped
						</div>
						<div
							className={`progress-label ${isStatusActive("Arriving Today", progressInfo.status) ? "active" : ""} ${progressInfo.status === "Arriving Today" ? "current-status" : ""}`}>
							Out for Delivery
						</div>
						<div
							className={`progress-label ${isStatusActive("Delivered", progressInfo.status) ? "active" : ""} ${progressInfo.status === "Delivered" ? "current-status" : ""}`}>
							Delivered
						</div>
					</div>

					<div className="progress-bar-container">
						<div
							className="progress-bar"
							style={{ width: `${progressInfo.progress}%` }}></div>
					</div>

					<div className="status-message">
						Current Status: <strong>{progressInfo.status}</strong>
					</div>
				</div>
			</div>
		</>
	);
}

export default Tracking;
