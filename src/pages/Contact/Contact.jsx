

import { useState } from "react";
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
		setFormData((prev) => ({ ...prev, [name]: value }));
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
		setFormData({ name: "", email: "", subject: "", message: "" });
		setTimeout(() => setSubmitted(false), 3000);
	};

	return (
		<>
			<title>Contact Us</title>
			<Header cart={cart} />

			{/* Contact Page */}
			<div className="mt-[60px] px-[15px] py-[40px] bg-[#f5f5f5] min-h-[calc(100vh-60px)]">
				<div className="max-w-[1000px] mx-auto max-[450px]:px-[10px]">
					{/* Title */}
					<h1 className="text-[36px] max-[768px]:text-[28px] max-[450px]:text-[24px] font-bold text-center text-[rgb(8,79,45)] mt-0 mb-[20px] max-[450px]:mb-[15px]">
						Contact Us
					</h1>

					{/* Subtitle */}
					<p className="text-[16px] max-[450px]:text-[14px] text-center text-[#666] mt-0 mb-[40px] max-[450px]:mb-[30px] leading-[1.6]">
						We'd love to hear from you. Please fill out the form below and we'll
						get back to you as soon as possible.
					</p>

					{/* Content Grid */}
					<div className="grid grid-cols-[1fr_1.2fr] max-[768px]:grid-cols-1 gap-[40px] max-[768px]:gap-[30px] max-[450px]:gap-[20px] bg-white p-[40px] max-[768px]:p-[30px_20px] max-[450px]:p-[20px_15px] rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
						{/* Contact Info */}
						<div className="flex flex-col gap-[25px]">
							{[
								{ title: "📧 Email", text: "support@generalstore.com" },
								{ title: "📞 Phone", text: "+977 (555) 123-4567" },
								{
									title: "📍 Address",
									text: (
										<>
											Godawari Municipality-12
											<br />
											Thecho, Lalitpur
											<br />
											Nepal
										</>
									),
								},
								{
									title: "⏰ Business Hours",
									text: (
										<>
											Monday - Friday: 9:00 AM - 6:00 PM EST
											<br />
											Saturday: 10:00 AM - 4:00 PM EST
											<br />
											Sunday: Closed
										</>
									),
								},
							].map((item) => (
								<div
									key={item.title}
									className="flex flex-col">
									<h3 className="text-[16px] font-bold text-[rgb(8,79,45)] mt-0 mb-[8px]">
										{item.title}
									</h3>
									<p className="text-[14px] leading-[1.6] text-[#555] m-0">
										{item.text}
									</p>
								</div>
							))}
						</div>

						{/* Contact Form */}
						<form
							className="flex flex-col gap-[20px]"
							onSubmit={handleSubmit}>
							{/* Success Message */}
							{submitted && (
								<div
									className="bg-[#d4edda] text-[#155724] px-[16px] py-[12px] rounded-[4px] border border-[#c3e6cb] font-medium mb-[10px]"
									style={{ animation: "slideIn 0.3s ease" }}>
									✓ Thank you! Your message has been sent successfully. We'll
									get back to you soon!
								</div>
							)}

							{/* Name */}
							<div className="flex flex-col gap-[6px]">
								<label
									htmlFor="name"
									className="text-[14px] font-semibold text-[#333]">
									Name
								</label>
								<input
									type="text"
									id="name"
									name="name"
									className="px-[12px] py-[10px] border border-[#ddd] rounded-[4px] text-[14px] focus:outline-none focus:border-[rgb(8,79,45)] focus:shadow-[0_0_0_3px_rgba(8,79,45,0.1)] transition-[border-color] duration-300"
									placeholder="Your Name"
									value={formData.name}
									onChange={handleChange}
								/>
							</div>

							{/* Email */}
							<div className="flex flex-col gap-[6px]">
								<label
									htmlFor="email"
									className="text-[14px] font-semibold text-[#333]">
									Email
								</label>
								<input
									type="email"
									id="email"
									name="email"
									className="px-[12px] py-[10px] border border-[#ddd] rounded-[4px] text-[14px] focus:outline-none focus:border-[rgb(8,79,45)] focus:shadow-[0_0_0_3px_rgba(8,79,45,0.1)] transition-[border-color] duration-300"
									placeholder="your@email.com"
									value={formData.email}
									onChange={handleChange}
								/>
							</div>

							{/* Subject */}
							<div className="flex flex-col gap-[6px]">
								<label
									htmlFor="subject"
									className="text-[14px] font-semibold text-[#333]">
									Subject
								</label>
								<input
									type="text"
									id="subject"
									name="subject"
									className="px-[12px] py-[10px] border border-[#ddd] rounded-[4px] text-[14px] focus:outline-none focus:border-[rgb(8,79,45)] focus:shadow-[0_0_0_3px_rgba(8,79,45,0.1)] transition-[border-color] duration-300"
									placeholder="Subject of your message"
									value={formData.subject}
									onChange={handleChange}
								/>
							</div>

							{/* Message */}
							<div className="flex flex-col gap-[6px]">
								<label
									htmlFor="message"
									className="text-[14px] font-semibold text-[#333]">
									Message
								</label>
								<textarea
									id="message"
									name="message"
									className="px-[12px] py-[10px] border border-[#ddd] rounded-[4px] text-[14px] resize-y min-h-[120px] focus:outline-none focus:border-[rgb(8,79,45)] focus:shadow-[0_0_0_3px_rgba(8,79,45,0.1)] transition-[border-color] duration-300"
									placeholder="Your message here..."
									rows="5"
									value={formData.message}
									onChange={handleChange}
								/>
							</div>

							{/* Submit Button */}
							<button
								type="submit"
								className="button-primary px-[24px] py-[12px] text-[16px] font-semibold border-none rounded-[4px] cursor-pointer mt-[10px] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_4px_12px_rgba(8,79,45,0.2)] active:translate-y-0">
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
