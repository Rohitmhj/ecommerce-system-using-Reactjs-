/** @format */

import dayjs from "dayjs";
import formatmoney from "../../utils/money";
import Header from "../../Components/Header";
import axios from "axios";
import { Fragment } from "react";
import { useNavigate } from "react-router";
import Track from "./Track";
import { getImageUrl } from "../../utils/imageLoader";

function Orders({ cart, order, loadCart }) {
	const navigate = useNavigate();

	const handleBuyAgain = async (product) => {
		try {
			const productId = product.product?.id || product.id;
			const quantity = product.quantity || 1;
			await axios.post(`/api/cart-items`, { productId, quantity });
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

			{/* Orders Page */}
			<div className="max-w-[850px] mt-[90px] mb-[100px] px-[20px] mx-auto">
				<div className="font-bold text-[26px] mb-[25px]">Your Orders</div>

				{/* Orders Grid */}
				<div className="grid grid-cols-1 gap-y-[50px]">
					{order.map((orders) => (
						<div key={orders.id}>
							{/* Order Header */}
							<div className="bg-white border border-[rgb(222,222,222)] flex items-center justify-between px-[25px] py-[20px] rounded-t-[5px] max-[575px]:flex-col max-[575px]:items-start max-[575px]:leading-[23px] max-[575px]:p-[15px]">
								{/* Left Section */}
								<div className="flex flex-shrink-0 max-[575px]:flex-col">
									<div className="mr-[45px] max-[575px]:mr-0 max-[575px]:grid max-[575px]:grid-cols-[auto_1fr]">
										<div className="font-bold max-[575px]:mr-[5px]">
											Order Placed:
										</div>
										<div>{dayjs(orders.orderTimeMs).format("MMMM D")}</div>
									</div>
									<div className="mr-[45px] max-[575px]:mr-0 max-[575px]:grid max-[575px]:grid-cols-[auto_1fr]">
										<div className="font-bold max-[575px]:mr-[5px]">Total:</div>
										<div>{formatmoney(orders.totalCostCents)}</div>
									</div>
								</div>

								{/* Right Section */}
								<div className="flex-shrink max-[575px]:grid max-[575px]:grid-cols-[auto_1fr]">
									<div className="font-bold max-[575px]:mr-[5px]">
										Order ID:
									</div>
									<div>{orders.id}</div>
								</div>
							</div>

							{/* Order Details Grid */}
							<div className="px-[25px] py-[40px] border border-[rgb(222,222,222)] border-t-0 rounded-b-[5px] grid grid-cols-[110px_1fr_220px] max-[800px]:grid-cols-[110px_1fr] max-[450px]:grid-cols-1 gap-x-[35px] gap-y-[60px] max-[800px]:gap-y-0 max-[800px]:pb-[8px] items-center">
								{orders.products.map((orderProduct) => {
									const totalquantity = orderProduct.quantity;
									return (
										<Fragment key={orderProduct.id}>
											{/* Product Image */}
											<div className="text-center max-[450px]:mb-[25px]">
												<img
													className="max-w-[110px] max-h-[110px] max-[450px]:max-w-[150px] max-[450px]:max-h-[150px]"
													src={getImageUrl(
														orderProduct.product?.image || orderProduct.image,
													)}
													alt={orderProduct.name}
												/>
											</div>

											{/* Product Details */}
											<div>
												<div className="font-bold mb-[5px] max-[450px]:mb-[10px]">
													{orderProduct.name}
												</div>
												<div className="mb-[3px]">
													{`Arriving on: ${dayjs(orderProduct.estimatedDeliveryTimeMs).format("MMMM D")}`}
												</div>
												<div className="mb-[8px] max-[450px]:mb-[15px]">
													{`Quantity: ${totalquantity}`}
												</div>
												<button
													className="button-primary text-[14px] w-[140px] h-[36px] rounded-[5px] flex items-center justify-center max-[800px]:mb-[10px] max-[450px]:w-full max-[450px]:mb-[15px]"
													onClick={() => handleBuyAgain(orderProduct)}>
													<img
														className="w-[20px] mr-[10px]"
														src={getImageUrl("images/icons/buy-again.png")}
														alt="Buy Again"
													/>
													<span>Buy Again</span>
												</button>
											</div>

											{/* Track Package */}
											<Track productId={orders.id} />
										</Fragment>
									);
								})}
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
export default Orders;
