/** @format */

import { useState } from "react";
import "./Contact.css";
import Header from "../../Components/Header";

function Contact({ cart }) {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const [submitted, setSubmitted] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		
		if (
			!formData.name.trim() ||
			!formData.email.trim() ||
			!formData.subject.trim() ||
			!formData.message.trim()
		) {
			alert("Please fill out all fields");
			return;
		}

		
		setSubmitted(true);
		setFormData({
			name: "",
			email: "",
			subject: "",
			message: "",
		});

		
		setTimeout(() => {
			setSubmitted(false);
		}, 3000);
	};

	return (
		<>
			<title>Contact Us</title>
			<Header cart={cart} />

			<div className="contact-page">
				<div className="contact-container">
					<h1 className="contact-title">Contact Us</h1>
					<p className="contact-subtitle">
						We'd love to hear from you. Please fill out the form below and we'll
						get back to you as soon as possible.
					</p>

					<div className="contact-content">
						<div className="contact-info">
							<div className="info-item">
								<h3 className="info-title">📧 Email</h3>
								<p className="info-text">support@generalstore.com</p>
							</div>

							<div className="info-item">
								<h3 className="info-title">📞 Phone</h3>
								<p className="info-text">+977 (555) 123-4567</p>
							</div>

							<div className="info-item">
								<h3 className="info-title">📍 Address</h3>
								<p className="info-text">
									Godawari Municipality-12
									<br />
									Thecho,Lalitpur
									<br />
									Nepal
								</p>
							</div>

							<div className="info-item">
								<h3 className="info-title">⏰ Business Hours</h3>
								<p className="info-text">
									Monday - Friday: 9:00 AM - 6:00 PM EST
									<br />
									Saturday: 10:00 AM - 4:00 PM EST
									<br />
									Sunday: Closed
								</p>
							</div>
						</div>

						<form
							className="contact-form"
							onSubmit={handleSubmit}>
							{submitted && (
								<div className="success-message">
									✓ Thank you! Your message has been sent successfully. We'll
									get back to you soon!
								</div>
							)}

							<div className="form-group">
								<label
									htmlFor="name"
									className="form-label">
									Name
								</label>
								<input
									type="text"
									id="name"
									name="name"
									className="form-input"
									placeholder="Your Name"
									value={formData.name}
									onChange={handleChange}
								/>
							</div>

							<div className="form-group">
								<label
									htmlFor="email"
									className="form-label">
									Email
								</label>
								<input
									type="email"
									id="email"
									name="email"
									className="form-input"
									placeholder="your@email.com"
									value={formData.email}
									onChange={handleChange}
								/>
							</div>

							<div className="form-group">
								<label
									htmlFor="subject"
									className="form-label">
									Subject
								</label>
								<input
									type="text"
									id="subject"
									name="subject"
									className="form-input"
									placeholder="Subject of your message"
									value={formData.subject}
									onChange={handleChange}
								/>
							</div>

							<div className="form-group">
								<label
									htmlFor="message"
									className="form-label">
									Message
								</label>
								<textarea
									id="message"
									name="message"
									className="form-textarea"
									placeholder="Your message here..."
									rows="5"
									value={formData.message}
									onChange={handleChange}
								/>
							</div>

							<button
								type="submit"
								className="submit-button button-primary">
								Send Message
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default Contact;
