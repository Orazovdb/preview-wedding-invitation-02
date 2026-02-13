import { motion } from "framer-motion";
import { weddingData } from "../data/wedding";
import "./Contact.css";

const stagger = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeUp = {
	hidden: { opacity: 0, y: 18 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] } },
};

/* ── SVG-иконки ── */
function PhoneIcon() {
	return (
		<svg className="ct-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
			<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
		</svg>
	);
}

function InstagramIcon() {
	return (
		<svg className="ct-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
			<rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
			<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
			<line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
		</svg>
	);
}

export function Contact() {
	const hasContacts =
		weddingData.groomPhone ||
		weddingData.bridePhone ||
		weddingData.organizerPhone ||
		weddingData.instagramUrl;

	if (!hasContacts) return null;

	return (
		<section className="ct-section">
			{/* ── Заголовок ── */}
			<motion.div
				className="ct-header"
				initial={{ opacity: 0, y: 16 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
			>
				<span className="ct-header-label">Свяжитесь с нами</span>
				<h2 className="ct-header-title">Контакты</h2>
				<div className="ct-header-ornament" aria-hidden>
					<span className="ct-header-line" />
					<span className="ct-header-dot" />
					<span className="ct-header-line" />
				</div>
			</motion.div>

			{/* ── Карточки контактов ── */}
			<motion.div
				className="ct-grid"
				variants={stagger}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
			>
				{/* Жених */}
				{weddingData.groomPhone && (
					<motion.a
						href={`tel:${weddingData.groomPhone.replace(/\s/g, "")}`}
						className="ct-card"
						variants={fadeUp}
					>
						<PhoneIcon />
						<span className="ct-card-name">{weddingData.groomName}</span>
						<span className="ct-card-value">{weddingData.groomPhone}</span>
					</motion.a>
				)}

				{/* Невеста */}
				{weddingData.bridePhone && (
					<motion.a
						href={`tel:${weddingData.bridePhone.replace(/\s/g, "")}`}
						className="ct-card"
						variants={fadeUp}
					>
						<PhoneIcon />
						<span className="ct-card-name">{weddingData.brideName}</span>
						<span className="ct-card-value">{weddingData.bridePhone}</span>
					</motion.a>
				)}

				</motion.div>

			{/* ── Организатор ── */}
			{weddingData.organizerPhone && (
				<motion.div
					className="ct-org"
					initial={{ opacity: 0, y: 14 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					<p className="ct-org-label">{weddingData.organizerLabel}</p>
					<div className="ct-org-phones">
						<a
							href={`tel:${weddingData.organizerPhone2?.replace(/\s/g, "") ?? weddingData.organizerPhone.replace(/\s/g, "")}`}
							className="ct-org-phone"
						>
							{weddingData.organizerPhone2 ?? weddingData.organizerPhone}
						</a>
						{weddingData.organizerPhone2 && (
							<>
								<span className="ct-org-sep" aria-hidden>·</span>
								<a
									href={`tel:${weddingData.organizerPhone.replace(/\s/g, "")}`}
									className="ct-org-phone"
								>
									{weddingData.organizerPhone}
								</a>
							</>
						)}
					</div>

					{/* Instagram организаторов */}
					{weddingData.instagramUrl && (
						<a
							href={weddingData.instagramUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="ct-org-instagram"
						>
							<InstagramIcon />
							<span>{weddingData.instagramUrl.replace(/^https?:\/\/(www\.)?/, "")}</span>
						</a>
					)}
				</motion.div>
			)}

			{/* ── Логотип ── */}
			{weddingData.logoUrl && (
				<motion.img
					src={weddingData.logoUrl}
					alt=""
					className="ct-logo"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.3 }}
				/>
			)}
		</section>
	);
}
