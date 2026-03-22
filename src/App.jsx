/** @format */

import { Routes, Route } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import Orders from "./pages/Order/Orders";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import Tracking from "./pages/tracking";
import Contact from "./pages/Contact/Contact";
import Footer from "./Components/Footer";

function App() {
	const [cart, setCart] = useState([]);

	const loadCart = async () => {
		const response = await axios.get("/api/cart-items?expand=product");
		setCart(response.data);
	};

	useEffect(() => {
		loadCart();
	}, []);

	const [order, setOrders] = useState([]);

	const loadOrders = async () => {
		const response = await axios.get("/api/orders?expand=products");
		setOrders(response.data);
	};

	useEffect(() => {
		loadOrders();
	}, []);

	return (
		<>
			<Routes>
				<Route
					path="/"
					element={
						<HomePage
							cart={cart}
							loadCart={loadCart}
						/>
					}
				/>
				<Route
					path="/checkout"
					element={
						<CheckoutPage
							cart={cart}
							loadCart={loadCart}
							loadOrders={loadOrders}
						/>
					}
				/>
				<Route
					path="/orders"
					element={
						<Orders
							cart={cart}
							order={order}
							loadCart={loadCart}
						/>
					}
				/>
				<Route
					path="/tracking"
					element={
						<Tracking
							order={order}
							cart={cart}
						/>
					}
				/>
				<Route
					path="/tracking/:orderId"
					element={
						<Tracking
							order={order}
							cart={cart}
						/>
					}
				/>
				<Route
					path="/contact"
					element={<Contact cart={cart} />}
				/>
			</Routes>
			<Footer />
		</>
	);
}

export default App;
