/** @format */

import { Link } from "react-router";

function Footer({ onHomeClick = () => {} }) {
	return (
		<footer className="bg-[rgb(8,79,45)] text-white mt-24 px-6 py-16 border-t-2 border-[rgba(255,255,255,0.1)]">
			<div className="max-w-7xl mx-auto">
				{/* Main Footer Grid */}
				<div className="grid grid-cols-2 gap-16 mb-12 md:grid-cols-1 md:gap-12">
					{/* About Us Section */}
					<div className="flex flex-col">
						<h4 className="text-lg font-bold mb-6 text-[rgb(186,255,190)] uppercase tracking-wider border-b-2 border-[rgba(255,255,255,0.1)] pb-4">
							About Us
						</h4>
						<p className="text-sm leading-8 text-white text-opacity-90">
							General Store is your trusted online marketplace for quality
							products at great prices. We are committed to providing
							exceptional service and value to our customers.
						</p>
					</div>

					{/* Quick Links Section */}
					<div className="flex flex-col items-center md:items-start">
						<h4 className="text-lg font-bold mb-6 text-[rgb(186,255,190)] uppercase tracking-wider border-b-2 border-[rgba(255,255,255,0.1)] pb-4 w-full text-center md:text-left">
							Quick Links
						</h4>
						<ul className="list-none flex flex-col gap-4 text-center md:text-left w-full">
							<li>
								<Link
									to="/"
									className="text-white text-opacity-90 no-underline text-sm font-medium hover:text-[rgb(186,255,190)] transition-colors duration-300 inline-block"
									onClick={onHomeClick}>
									→ Home
								</Link>
							</li>
							<li>
								<Link
									to="/orders"
									className="text-white text-opacity-90 no-underline text-sm font-medium hover:text-[rgb(186,255,190)] transition-colors duration-300 inline-block">
									→ Orders
								</Link>
							</li>
							<li>
								<Link
									to="/checkout"
									className="text-white text-opacity-90 no-underline text-sm font-medium hover:text-[rgb(186,255,190)] transition-colors duration-300 inline-block">
									→ Cart
								</Link>
							</li>
							<li>
								<Link
									to="/contact"
									className="text-white text-opacity-90 no-underline text-sm font-medium hover:text-[rgb(186,255,190)] transition-colors duration-300 inline-block">
									→ Contact
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* Footer Bottom */}
				<div className="pt-8 border-t-2 border-[rgba(255,255,255,0.1)] text-center">
					<p className="text-sm text-white text-opacity-80">
						&copy; 2024 General Store. All rights reserved. | Design with care
						for our customers
					</p>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
