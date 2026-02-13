import { motion } from "framer-motion";
import { weddingData } from "../data/wedding";
import "./Schedule.css";

const timeline = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.15 }
	}
};

const timelineItem = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.45 } }
};

const ICONS = ["✦", "❖", "✿", "★", "♦"];

export function Schedule() {
	return (
		<section className="schedule-section">
			<motion.div
				className="schedule-header"
				initial={{ opacity: 0, y: 15 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5 }}
			>
				<span className="schedule-header-label">WEDDING</span>
				<h2 className="schedule-header-title">Program</h2>
				<div className="schedule-header-line" aria-hidden />
			</motion.div>

			<motion.div
				className="schedule-timeline"
				variants={timeline}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
			>
				<div className="schedule-timeline-track" aria-hidden />
				{weddingData.schedule.map((item, i) => (
					<motion.div
						key={i}
						className="schedule-card"
						variants={timelineItem}
					>
						<div className="schedule-card-dot" aria-hidden>
							<span className="schedule-card-dot-icon">
								{ICONS[i % ICONS.length]}
							</span>
						</div>
						<div className="schedule-card-body">
							<span className="schedule-card-time">{item.time}</span>
							<h3 className="schedule-card-title">{item.title}</h3>
							{item.description && (
								<p className="schedule-card-desc">{item.description}</p>
							)}
						</div>
					</motion.div>
				))}
			</motion.div>

			<motion.div
				initial={{ opacity: 0, scale: 0.97 }}
				whileInView={{ opacity: 1, scale: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5 }}
				className="schedule-footer-image"
			>
				<img src="/wedding.jpeg" alt="wedding" />
			</motion.div>
		</section>
	);
}
