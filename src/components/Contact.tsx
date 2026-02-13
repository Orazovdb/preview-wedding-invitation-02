import { motion } from "framer-motion";
import { weddingData } from "../data/wedding";
import "./Contact.css";

export function Contact() {
	const hasContacts =
		weddingData.groomPhone ||
		weddingData.bridePhone ||
		weddingData.organizerPhone ||
		weddingData.instagramUrl;
	if (!hasContacts) {
		return null;
	}

	return (
		<motion.div
			className="contact-block"
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5 }}
		>
			<h2 className="contact-title">CONTACT</h2>
			<div className="contact-list">
				{weddingData.groomPhone && (
					<div className="contact-item">
						<span className="contact-label">{weddingData.groomName}</span>
						<a
							href={`tel:${weddingData.groomPhone.replace(/\s/g, "")}`}
							className="contact-phone"
						>
							{weddingData.groomPhone}
						</a>
					</div>
				)}
				{weddingData.bridePhone && (
					<div className="contact-item">
						<span className="contact-label">{weddingData.brideName}</span>
						<a
							href={`tel:${weddingData.bridePhone.replace(/\s/g, "")}`}
							className="contact-phone"
						>
							{weddingData.bridePhone}
						</a>
					</div>
				)}
				{weddingData.organizerPhone && (
					<div className="contact-item">
						<span className="contact-label">{weddingData.organizerLabel}</span>
						<a
							href={`tel:${weddingData.organizerPhone.replace(/\s/g, "")}`}
							className="contact-phone"
						>
							{weddingData.organizerPhone2},
						</a>
						<a
							href={`tel:${weddingData.organizerPhone.replace(/\s/g, "")}`}
							className="contact-phone"
						>
							{weddingData.organizerPhone}
						</a>
					</div>
				)}
				{weddingData.instagramUrl && (
					<div className="contact-item">
						<span className="contact-label">{weddingData.instagramLabel}</span>
						<a
							href={weddingData.instagramUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="contact-link"
						>
							{weddingData.instagramUrl.replace(/^https?:\/\/(www\.)?/, "")}
						</a>
					</div>
				)}
				{weddingData.logoUrl && (
					<img
						src={weddingData.logoUrl}
						alt=""
						className="contact-logo"
						width={150}
						height={50}
					/>
				)}
			</div>
		</motion.div>
	);
}
