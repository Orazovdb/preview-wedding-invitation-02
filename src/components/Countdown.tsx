import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingData } from "../data/wedding";
import "./Countdown.css";

interface TimeLeft {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

function getTimeLeft(target: Date): TimeLeft {
	const diff = target.getTime() - Date.now();
	if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
	return {
		days: Math.floor(diff / 86_400_000),
		hours: Math.floor((diff % 86_400_000) / 3_600_000),
		minutes: Math.floor((diff % 3_600_000) / 60_000),
		seconds: Math.floor((diff % 60_000) / 1_000),
	};
}

/** Склонение слова по числу: pluralize(5, 'день','дня','дней') → 'дней' */
function pluralize(n: number, one: string, few: string, many: string) {
	const abs = Math.abs(n) % 100;
	const last = abs % 10;
	if (abs > 10 && abs < 20) return many;
	if (last > 1 && last < 5) return few;
	if (last === 1) return one;
	return many;
}

const UNITS: { key: keyof TimeLeft; one: string; few: string; many: string }[] = [
	{ key: "days", one: "день", few: "дня", many: "дней" },
	{ key: "hours", one: "час", few: "часа", many: "часов" },
	{ key: "minutes", one: "минута", few: "минуты", many: "минут" },
	{ key: "seconds", one: "секунда", few: "секунды", many: "секунд" },
];

const stagger = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const tileVariant = {
	hidden: { opacity: 0, y: 24, scale: 0.92 },
	visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] } },
};

/** Анимированная цифра с вертикальным flip-эффектом */
function AnimatedDigit({ value }: { value: string }) {
	const prevRef = useRef(value);
	const changed = prevRef.current !== value;

	useEffect(() => {
		prevRef.current = value;
	}, [value]);

	return (
		<span className="cd-digit-wrap">
			<AnimatePresence mode="popLayout" initial={false}>
				<motion.span
					key={value}
					className="cd-digit"
					initial={changed ? { y: -18, opacity: 0 } : false}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: 18, opacity: 0 }}
					transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
				>
					{value}
				</motion.span>
			</AnimatePresence>
		</span>
	);
}

export function Countdown() {
	const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
		getTimeLeft(weddingData.weddingDate)
	);

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(getTimeLeft(weddingData.weddingDate));
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	return (
		<section className="cd-section">
			{/* ── Заголовок ── */}
			<motion.div
				className="cd-header"
				initial={{ opacity: 0, y: 16 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
			>
				<span className="cd-header-label">До свадьбы осталось</span>
				<div className="cd-header-ornament" aria-hidden>
					<span className="cd-header-line" />
					<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
						<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
					</svg>
					<span className="cd-header-line" />
				</div>
			</motion.div>

			{/* ── Плитки таймера ── */}
			<motion.div
				className="cd-tiles"
				variants={stagger}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
			>
				{UNITS.map(({ key, one, few, many }, i) => {
					const val = String(timeLeft[key]).padStart(2, "0");
					const label = pluralize(timeLeft[key], one, few, many);

					return (
						<motion.div key={key} className="cd-tile-wrap" variants={tileVariant}>
							<div className="cd-tile">
								<div className="cd-tile-value">
									{val.split("").map((ch, j) => (
										<AnimatedDigit key={`${key}-${j}`} value={ch} />
									))}
								</div>
								<span className="cd-tile-label">{label}</span>
							</div>
							{i < UNITS.length - 1 && (
								<span className="cd-sep" aria-hidden>
									<span className="cd-sep-dot" />
									<span className="cd-sep-dot" />
								</span>
							)}
						</motion.div>
					);
				})}
			</motion.div>
		</section>
	);
}
