import { motion } from "framer-motion";
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
			<motion.footer
				className="invitation-footer"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5 }}
			>
				<p>Этот день станет особенным именно благодаря вам!</p>
			</motion.footer>
		</motion.main>
	);
}
