/** @format */

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
				if (orderId) {
					const response = await axios.get(
						`/api/orders/${orderId}?expand=products`,
					);
					data = response.data;
				} else if (order && order.length > 0) {
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

	const getProgressInfo = (estimatedDeliveryMs) => {
		const deliveryDate = dayjs(estimatedDeliveryMs);
		const today = dayjs();
		const daysUntilDelivery = deliveryDate.diff(today, "day");
		if (daysUntilDelivery > 1) return { status: "Preparing", progress: 25 };
		else if (daysUntilDelivery > 0) return { status: "Shipped", progress: 65 };
		else if (daysUntilDelivery === 0)
			return { status: "Arriving Today", progress: 90 };
		else return { status: "Delivered", progress: 100 };
	};

	const isStatusActive = (statusName, currentStatus) => {
		const statuses = ["Preparing", "Shipped", "Arriving Today", "Delivered"];
		return statuses.indexOf(statusName) <= statuses.indexOf(currentStatus);
	};

	// Loading state
	if (loading) {
		return (
			<>
				<Header cart={cart} />
				<div className="max-w-[850px] mt-[90px] mb-[100px] px-[30px] mx-auto">
					<div className="text-[18px] text-[rgb(100,100,100)] text-center py-[40px] px-[20px]">
						Loading tracking information...
					</div>
				</div>
			</>
		);
	}

	// Error state
	if (error || !trackingData) {
		return (
			<>
				<Header cart={cart} />
				<div className="max-w-[850px] mt-[90px] mb-[100px] px-[30px] mx-auto">
					<a
						className="inline-block mb-[30px] link-primary"
						href="/orders">
						View all orders
					</a>
					<div className="text-[18px] text-[rgb(220,53,69)] text-center py-[30px] px-[20px] bg-[rgb(248,215,219)] border border-[rgb(245,198,203)] rounded-[4px]">
						{error || "No tracking data available"}
					</div>
				</div>
			</>
		);
	}

	const product = trackingData.products?.[0];
	const progressInfo =
		product ?
			getProgressInfo(product.estimatedDeliveryTimeMs)
		:	{ status: "Unknown", progress: 0 };
	const rawProductImage = product?.product?.image || product?.image;
	const productImage = getImageUrl(rawProductImage);

	return (
		<>
			<title>Tracking</title>
			<Header cart={cart} />

			<div className="max-w-[850px] mt-[90px] mb-[100px] px-[30px] mx-auto">
				{/* Back Link */}
				<a
					className="inline-block mb-[30px] link-primary"
					href="/orders">
					View all orders
				</a>

				{product && (
					<>
						{/* Delivery Date */}
						<div className="text-[25px] font-bold mb-[10px]">
							Arriving on{" "}
							{dayjs(product.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
						</div>

						{/* Product Info */}
						<div className="mb-[3px]">{product.name}</div>
						<div className="mb-[3px]">Quantity: {product.quantity}</div>

						{/* Product Image */}
						{productImage && (
							<img
								className="max-w-[150px] max-h-[150px] mt-[25px] mb-[50px]"
								src={productImage}
								alt={product.name}
								onError={(e) => handleImageError(e)}
								onLoad={(e) => handleImageLoad(e.target.src)}
							/>
						)}
					</>
				)}

				{/* Progress Labels */}
				<div className="flex justify-between text-[20px] font-medium mb-[15px] gap-[10px] max-[575px]:text-[16px] max-[450px]:flex-col max-[450px]:mb-[5px] max-[450px]:gap-[5px]">
					{["Preparing", "Shipped", "Arriving Today", "Delivered"].map(
						(label) => (
							<div
								key={label}
								className={`transition-colors duration-300 max-[450px]:mb-[3px]
                ${
									isStatusActive(label, progressInfo.status) ?
										progressInfo.status === label ?
											"text-[rgb(25,135,84)] font-bold"
										:	"text-[rgb(25,135,84)] font-semibold"
									:	"text-[rgb(160,160,160)]"
								}`}>
								{label}
							</div>
						),
					)}
				</div>

				{/* Progress Bar */}
				<div className="h-[25px] w-full border border-[rgb(200,200,200)] rounded-[50px] overflow-hidden mb-[30px]">
					<div
						className="h-full bg-[rgb(25,135,84)] rounded-[50px] transition-[width] duration-500 ease-in-out"
						style={{ width: `${progressInfo.progress}%` }}></div>
				</div>

				{/* Status Message */}
				<div className="text-[18px] text-[rgb(68,68,68)] p-[15px] bg-[rgb(245,245,245)] border-l-4 border-[rgb(25,135,84)] rounded-[4px] max-[450px]:text-[16px]">
					Current Status: <strong>{progressInfo.status}</strong>
				</div>
			</div>
		</>
	);
}

export default Tracking;
