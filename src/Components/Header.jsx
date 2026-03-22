/** @format */

import "./header.css";
import { Link } from "react-router";
import { useState } from "react";
import { getImageUrl } from "../utils/imageLoader";

function Header({ cart = [], onSearch = () => {} }) {
	const [searchValue, setSearchValue] = useState("");
	let cartQuantity = 0;

	if (cart && Array.isArray(cart)) {
		cart.forEach((cartItem) => {
			cartQuantity += cartItem.quantity;
		});
	}

	const handleSearchClick = () => {
		onSearch(searchValue);
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			handleSearchClick();
		}
	};

	const handleLogoClick = () => {
		setSearchValue("");
		onSearch("");
	};

	return (
		<>
			<div className="header">
				<div className="left-section">
					<Link
						to="/"
						className="header-link"
						onClick={handleLogoClick}>
						<div className="store-logo-container">
							<span className="store-logo-icon">🏪</span>
							<span className="store-logo-text">General Store</span>
						</div>
					</Link>
				</div>

				<div className="middle-section">
					<input
						className="search-bar"
						type="text"
						placeholder="Search"
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
						onKeyPress={handleKeyPress}
					/>

					<button
						className="search-button"
						onClick={handleSearchClick}>
						<img
							className="search-icon"
							src={getImageUrl("images/icons/search-icon.png")}
							alt="Search"
						/>
					</button>
				</div>

				<div className="right-section">
					<Link
						className="orders-link header-link"
						to="/orders">
						<span className="orders-text">Orders</span>
					</Link>

					<Link
						className="orders-link header-link"
						to="/contact">
						<span className="orders-text">Contact</span>
					</Link>

					<Link
						className="cart-link header-link"
						to="/checkout">
						<img
							className="cart-icon"
							src={getImageUrl("images/icons/cart-icon.png")}
							alt="Cart"
						/>
						<div className="cart-quantity">{cartQuantity}</div>
						<div className="cart-text">Cart</div>
					</Link>
				</div>
			</div>
		</>
	);
}

export default Header;
