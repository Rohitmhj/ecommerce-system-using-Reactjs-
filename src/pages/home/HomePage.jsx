/** @format */

import axios from "axios";
import { useEffect, useState } from "react";

import Header from "../../Components/Header";
import Productgrid from "./Productgrid";

function HomePage({ cart, loadCart }) {
	const [products, setproduct] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [allProducts, setAllProducts] = useState([]);

	useEffect(() => {
		const getHomeData = async () => {
			const response = await axios.get("/api/products?expand=product");
			setproduct(response.data);
			setAllProducts(response.data);
		};
		getHomeData();
	}, []);

	const handleSearch = (query) => {
		setSearchQuery(query);
		if (query.trim() === "") {
			setproduct(allProducts);
		} else {
			const filtered = allProducts.filter(
				(product) =>
					product.name &&
					product.name.toLowerCase().includes(query.toLowerCase()),
			);
			setproduct(filtered);
		}
	};

	

	return (
		<>
			<title>Ecommerce-project</title>
			<title>Ecommerce-project</title>
			<Header
				cart={cart}
				onSearch={handleSearch}
			/>

			<div className="mt-[60px]">
				{products.length === 0 && searchQuery.trim() !== "" ?
					<div className="flex justify-center items-center min-h-[300px] text-[24px] text-[rgb(128,128,128)] font-medium text-center px-5 py-10">
						<p>Product not found</p>
					</div>
				:	<Productgrid
						products={products}
						loadCart={loadCart}
					/>
				}
			</div>
		</>
	);
}
export default HomePage;
