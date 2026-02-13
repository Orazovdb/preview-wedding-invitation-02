import { motion } from "framer-motion";
import { weddingData } from "../data/wedding";
import "./Schedule.css";

/* ── Иконки для каждого события (SVG inline) ── */
const EVENT_ICONS = [
	/* Встреча гостей — бокал */
	<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 22h8M12 13v9M5 1l1 11a5 5 0 0 0 4 4.9M19 1l-1 11a5 5 0 0 1-4 4.9" /><path d="M5 1h14" /></svg>,
	/* Церемония — кольца */
	<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="9" cy="13" r="5" /><circle cx="15" cy="13" r="5" /></svg>,
	/* Банкет — столовые приборы */
	<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" /></svg>,
	/* Торт — торт */
	<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" /><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" /><path d="M2 21h20" /><path d="M7 8v3M12 8v3M17 8v3" /><path d="M7 4h.01M12 4h.01M17 4h.01" /></svg>,
	/* Танцы — музыка */
	<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>,
	/* Прощание — сердце */
	<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>,
];

const stagger = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
	hidden: { opacity: 0, y: 22 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] } },
};

export function Schedule() {
	return (
		<section className="sch-section">
			{/* ── Заголовок ── */}
			<motion.div
				className="sch-header"
				initial={{ opacity: 0, y: 16 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
			>
				<span className="sch-header-label">Программа</span>
				<h2 className="sch-header-title">Свадебного дня</h2>
				<div className="sch-header-ornament" aria-hidden>
					<span className="sch-header-ornament-line" />
					<span className="sch-header-ornament-dot" />
					<span className="sch-header-ornament-line" />
				</div>
			</motion.div>

			{/* ── Timeline ── */}
			<motion.div
				className="sch-timeline"
				variants={stagger}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
			>
				{/* Вертикальная линия */}
				<div className="sch-track" aria-hidden />

				{weddingData.schedule.map((item, i) => (
					<motion.div
						key={i}
						className="sch-item"
						variants={fadeUp}
					>
						{/* Узел на таймлайне */}
						<div className="sch-node" aria-hidden>
							<span className="sch-node-circle">
								{EVENT_ICONS[i % EVENT_ICONS.length]}
							</span>
						</div>

						{/* Карточка */}
						<div className="sch-card">
							<div className="sch-card-top">
								<span className="sch-card-time">{item.time}</span>
							</div>
							<h3 className="sch-card-title">{item.title}</h3>
							{item.description && (
								<p className="sch-card-desc">{item.description}</p>
							)}
						</div>
					</motion.div>
				))}
			</motion.div>

			{/* ── Фото внизу ── */}
			<motion.div
				className="sch-photo"
				initial={{ opacity: 0, scale: 0.97 }}
				whileInView={{ opacity: 1, scale: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6, delay: 0.1 }}
			>
				<img src="/wedding.jpeg" alt="wedding" />
			</motion.div>
		</section>
	);
}
