import { motion } from "framer-motion";
import { weddingData } from "../data/wedding";
import "./DateLocation.css";

const WEEKDAYS = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
const MONTHS_RU = [
	"Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
	"Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];
const MONTHS_GENITIVE = [
	"января", "февраля", "марта", "апреля", "мая", "июня",
	"июля", "августа", "сентября", "октября", "ноября", "декабря"
];

function buildCalendarGrid(date: Date): (number | null)[] {
	const year = date.getFullYear();
	const month = date.getMonth();
	const firstDay = new Date(year, month, 1);
	const lastDay = new Date(year, month + 1, 0);
	const daysInMonth = lastDay.getDate();
	const startOffset = (firstDay.getDay() + 6) % 7;

	const grid: (number | null)[] = [];
	for (let i = 0; i < startOffset; i++) grid.push(null);
	for (let d = 1; d <= daysInMonth; d++) grid.push(d);
	return grid;
}

/* ── Анимации ── */
const fadeUp = {
	hidden: { opacity: 0, y: 24 },
	visible: { opacity: 1, y: 0 },
};

const calendarCellVariant = {
	hidden: { opacity: 0, scale: 0.7 },
	visible: { opacity: 1, scale: 1 },
};

const calendarGridVariant = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { staggerChildren: 0.018, delayChildren: 0.1 } },
};

export function DateLocation() {
	const wd = weddingData.weddingDate;
	const day = wd.getDate();
	const month = wd.getMonth();
	const year = wd.getFullYear();
	const grid = buildCalendarGrid(wd);

	const timeStr = wd.toLocaleTimeString("ru-RU", {
		hour: "2-digit",
		minute: "2-digit",
	});

	return (
		<section className="dl-section">
			{/* ═══ Блок «Сохраните дату» ═══ */}
			<motion.div
				className="dl-hero"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				transition={{ staggerChildren: 0.12 }}
			>
				{/* Подзаголовок */}
				<motion.span
					className="dl-hero-label"
					variants={fadeUp}
					transition={{ duration: 0.6 }}
				>
					Сохраните дату
				</motion.span>

				{/* Большая дата: число + линия + месяц/год */}
				<motion.div
					className="dl-hero-date"
					variants={fadeUp}
					transition={{ duration: 0.7 }}
				>
					<span className="dl-hero-day">{day}</span>
					<div className="dl-hero-sep">
						<span className="dl-hero-sep-line" />
					</div>
					<div className="dl-hero-my">
						<span className="dl-hero-month">{MONTHS_GENITIVE[month]}</span>
						<span className="dl-hero-year">{year}</span>
					</div>
				</motion.div>

				{/* Текст-приглашение */}
				<motion.p
					className="dl-hero-text"
					variants={fadeUp}
					transition={{ duration: 0.6 }}
				>
					Мы будем счастливы разделить с&nbsp;вами радость этого дня
				</motion.p>
			</motion.div>

			{/* ═══ Календарь ═══ */}
			<motion.div
				className="dl-calendar"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				transition={{ duration: 0.6, delay: 0.1 }}
				variants={fadeUp}
			>
				{/* Заголовок месяца */}
				<div className="dl-cal-header">
					<span className="dl-cal-header-line" />
					<h3 className="dl-cal-title">
						{MONTHS_RU[month]} {year}
					</h3>
					<span className="dl-cal-header-line" />
				</div>

				{/* Дни недели */}
				<div className="dl-cal-weekdays">
					{WEEKDAYS.map((d) => (
						<span key={d} className="dl-cal-wd">{d}</span>
					))}
				</div>

				{/* Сетка дней */}
				<motion.div
					className="dl-cal-grid"
					variants={calendarGridVariant}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
				>
					{grid.map((cell, i) => {
						const isWedding = cell === day;
						return (
							<motion.div
								key={i}
								className={`dl-cal-cell ${isWedding ? "dl-cal-cell--active" : ""}`}
								variants={calendarCellVariant}
								transition={{ duration: 0.3, ease: "easeOut" }}
							>
								{cell !== null && (
									<span className="dl-cal-num">{cell}</span>
								)}
								{isWedding && (
									<span className="dl-cal-ring" aria-hidden />
								)}
							</motion.div>
						);
					})}
				</motion.div>

				{/* Время начала */}
				<div className="dl-cal-time">
					<svg className="dl-cal-time-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
						<circle cx="12" cy="12" r="10" />
						<polyline points="12 6 12 12 16 14" />
					</svg>
					<span className="dl-cal-time-label">Начало в</span>
					<span className="dl-cal-time-value">{timeStr}</span>
				</div>
			</motion.div>

			{/* ═══ Локация ═══ */}
			<motion.div
				className="dl-location"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				transition={{ duration: 0.6, delay: 0.15 }}
				variants={fadeUp}
			>
				<div className="dl-loc-overlay" />
				<div className="dl-loc-content">
					<span className="dl-loc-badge">Место проведения</span>

					<h2 className="dl-loc-name">
						Ресторан «{weddingData.venue}»
					</h2>

					{weddingData.venueAddress && (
						<p className="dl-loc-address">{weddingData.venueAddress}</p>
					)}

					{weddingData.mapUrl && (
						<a
							href={weddingData.mapUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="dl-loc-btn"
						>
							<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
								<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
								<circle cx="12" cy="10" r="3" />
							</svg>
							Посмотреть на карте
						</a>
					)}
				</div>
			</motion.div>
		</section>
	);
}
