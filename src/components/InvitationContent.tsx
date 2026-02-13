import { motion } from "framer-motion";
import { weddingData } from "../data/wedding";
import { Contact } from "./Contact";
import { Countdown } from "./Countdown";
import { DateLocation } from "./DateLocation";
import { Schedule } from "./Schedule";
import "./InvitationContent.css";

export function InvitationContent() {
	return (
		<motion.main
			className="invitation-content"
			initial={{ opacity: 0, scale: 0.96 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
		>
			{/* <Hero /> */}
			<DateLocation />
			<Schedule />
			<Countdown />
			{/* <Photos /> */}
			<Contact />

			{/* ── Footer ── */}
			<motion.footer
				className="inv-footer"
				initial={{ opacity: 0, y: 16 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
			>
				<div className="inv-footer-inner">
					{/* Декоративный орнамент */}
					<div className="inv-footer-ornament" aria-hidden>
						<span className="inv-footer-line" />
						<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
							<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
						</svg>
						<span className="inv-footer-line" />
					</div>

					{/* Благодарственное сообщение */}
					<p className="inv-footer-quote">
						Этот день станет особенным<br />именно благодаря вам
					</p>

					{/* Имена */}
					<p className="inv-footer-names">
						{weddingData.groomName}
						<span className="inv-footer-amp">&</span>
						{weddingData.brideName}
					</p>

					{/* Копирайт */}
					<span className="inv-footer-copy">
						{weddingData.weddingDate.getFullYear()}
					</span>
				</div>
			</motion.footer>
		</motion.main>
	);
}
