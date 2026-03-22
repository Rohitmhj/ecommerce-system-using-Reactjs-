/** @format */

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
			<div className="bg-[rgb(8,79,45)] text-white pl-[15px] pr-[15px] flex items-center justify-between fixed top-0 left-0 right-0 h-[60px] z-50">
				{/* Logo Section */}
				<div className="w-[208px] max-[800px]:w-auto flex-shrink-0">
					<Link
						to="/"
						className="inline-block px-[9.5px] py-[6px] rounded-sm cursor-pointer no-underline border border-transparent hover:border-white transition-colors"
						onClick={handleLogoClick}>
						<div className="flex items-center gap-2 max-[675px]:gap-[6px] whitespace-nowrap">
							<span className="text-[28px] max-[675px]:text-[20px] inline-block">
								🏪
							</span>
							<span className="text-[24px] max-[675px]:text-[18px] font-bold text-white tracking-[1px] whitespace-nowrap">
								General Store
							</span>
						</div>
					</Link>
				</div>

				{/* Search Section */}
				<div className="flex-1 max-w-[850px] mx-[10px] flex">
					<input
						className="flex-1 w-0 text-base h-[40px] pl-[15px] border-none rounded-l-[5px] rounded-r-none outline-none text-gray-800 placeholder-gray-500"
						type="text"
						placeholder="Search"
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
						onKeyPress={handleKeyPress}
					/>
					<button
						className="bg-[rgb(186,255,190)] hover:bg-[rgb(170,240,170)] border-none w-[45px] h-[40px] rounded-r-[5px] rounded-l-none flex-shrink-0 cursor-pointer flex items-center justify-center"
						onClick={handleSearchClick}>
						<img
							className="h-5 mt-[3px]"
							src={getImageUrl("images/icons/search-icon.png")}
							alt="Search"
						/>
					</button>
				</div>

				{/* Right Section - Orders, Contact, Cart */}
				<div className="flex items-center gap-1 flex-shrink-0">
					<Link
						className="text-white no-underline flex items-center px-[13px] border border-transparent hover:border-white rounded-sm"
						to="/orders"
						title="View Orders">
						<span className="block text-[15px] font-bold">Orders</span>
					</Link>

					<Link
						className="text-white no-underline flex items-center px-[13px] border border-transparent hover:border-white rounded-sm max-[675px]:hidden"
						to="/contact"
						title="Contact Us">
						<span className="block text-[15px] font-bold">Contact</span>
					</Link>

					<Link
						className="text-white no-underline flex items-center relative border border-transparent hover:border-white rounded-sm px-[9.5px] py-[6px]"
						to="/checkout"
						title="View Cart">
						<img
							className="w-[38px]"
							src={getImageUrl("images/icons/cart-icon.png")}
							alt="Cart"
						/>
						{cartQuantity > 0 && (
							<span className="text-[rgb(8,79,45)] text-[14px] font-bold absolute top-[8.5px] right-[46px] w-[26px] text-center">
								{cartQuantity}
							</span>
						)}
						<span className="ml-[5px] text-[15px] font-bold">Cart</span>
					</Link>
				</div>
			</div>
		</>
	);
}

export default Header;
