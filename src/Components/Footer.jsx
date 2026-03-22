/** @format */

import "./footer.css";
import { Link } from "react-router";

function Footer({ onHomeClick = () => {} }) {
	return (
		<footer className="footer">
			<div className="footer-content">
				<div className="footer-section">
					<h4 className="footer-title">About Us</h4>
					<p className="footer-text">
						General Store is your trusted online marketplace for quality
						products at great prices.
					</p>
				</div>

				<div className="footer-section">
					<h4 className="footer-title">Quick Links</h4>
					<ul className="footer-links">
						<li>
							<Link
								to="/"
								onClick={onHomeClick}>
								Home
							</Link>
						</li>
						<li>
							<Link to="/orders">Orders</Link>
						</li>
						<li>
							<Link to="/checkout">Cart</Link>
						</li>
						<li>
							<Link to="/contact">Contact</Link>
						</li>
					</ul>
				</div>
			</div>

			<div className="footer-bottom">
				<p>&copy; 2024 General Store. All rights reserved.</p>
			</div>
		</footer>
	);
}

export default Footer;
