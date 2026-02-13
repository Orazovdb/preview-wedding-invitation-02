import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingData } from "../data/wedding";
import "./CouplePhoto.css";

interface CouplePhotoProps {
	onOpen: () => void;
	onUnlockAudio?: () => void;
}

/**
 * Фазы анимации:
 * idle    → фото «дышит», частицы летают, пульсирующее свечение
 * flash   → кольцо света, текст растворяется с blur
 * expand  → clip-path circle раскрывает полноэкранное фото (iris wipe)
 * settle  → имена + scroll-индикатор, onOpen разблокирует скролл
 */
type Phase = "idle" | "flash" | "expand" | "settle";

export function CouplePhoto({ onOpen, onUnlockAudio }: CouplePhotoProps) {
	const [phase, setPhase] = useState<Phase>("idle");

	const handleClick = useCallback(() => {
		if (phase !== "idle") return;
		onUnlockAudio?.();
		setPhase("flash");
	}, [phase, onUnlockAudio]);

	/* ── Автоматическая смена фаз ── */
	useEffect(() => {
		if (phase === "idle" || phase === "settle") return;

		const sequence: Record<string, [number, Phase]> = {
			flash: [750, "expand"],
			expand: [2900, "settle"],
		};

		const entry = sequence[phase];
		if (!entry) return;

		const [ms, next] = entry;
		const timer = setTimeout(() => {
			if (next === "settle") onOpen();
			setPhase(next);
		}, ms);

		return () => clearTimeout(timer);
	}, [phase, onOpen]);

	const isOpening = phase !== "idle";
	const isRevealing = phase === "expand" || phase === "settle";

	return (
		<motion.div
			className="couple-photo-screen"
			initial={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.4 }}
		>
			{/* ── Плавающие частицы (только idle) ── */}
			<div className="cp-particles" aria-hidden>
				{[...Array(7)].map((_, i) => (
					<span key={i} className={`cp-dot cp-dot--${i}`} />
				))}
			</div>

			{/* ── Текст: заголовок + имена (blur-растворение при открытии) ── */}
			<AnimatePresence>
				{!isOpening && (
					<motion.div
						key="text"
						className="cp-text-group"
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -50, filter: "blur(14px)" }}
						transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
					>
						<div className="couple-photo-top-ornament" aria-hidden>
							<svg viewBox="0 0 120 12" width="80" height="12">
								<line x1="0" y1="6" x2="50" y2="6" stroke="currentColor" strokeWidth="0.5" />
								<circle cx="60" cy="6" r="3" fill="none" stroke="currentColor" strokeWidth="0.5" />
								<circle cx="60" cy="6" r="1" fill="currentColor" />
								<line x1="70" y1="6" x2="120" y2="6" stroke="currentColor" strokeWidth="0.5" />
							</svg>
						</div>
						<h1 className="couple-photo-header">Приглашение на свадьбу</h1>
						<p className="couple-photo-names">
							{weddingData.groomName}
							<span className="couple-photo-ampersand">&</span>
							{weddingData.brideName}
						</p>
					</motion.div>
				)}
			</AnimatePresence>

			{/* ── Маленькое фото (пульсирует → исчезает при раскрытии) ── */}
			<motion.div
				className="cp-photo-thumb"
				initial={{ opacity: 0, scale: 0.92 }}
				animate={
					phase === "idle"
						? { opacity: 1, scale: 1 }
						: phase === "flash"
							? { opacity: 1, scale: [1, 1.06, 1.02] }
							: { opacity: 0, scale: 1.1, filter: "blur(6px)" }
				}
				transition={
					phase === "idle"
						? { duration: 0.8, delay: 0.3, ease: "easeOut" }
						: phase === "flash"
							? { duration: 0.5, ease: "easeOut" }
							: { duration: 0.7, ease: "easeOut" }
				}
			>
				{/* Пульсирующее кольцо на клик */}
				<AnimatePresence>
					{phase === "flash" && (
						<motion.span
							key="ring"
							className="cp-ring"
							initial={{ opacity: 0, scale: 0.88 }}
							animate={{ opacity: [0, 0.9, 0], scale: [0.88, 1.3, 1.6] }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.7, ease: "easeOut" }}
						/>
					)}
				</AnimatePresence>

				<button
					type="button"
					className="couple-photo-btn"
					onClick={handleClick}
					disabled={isOpening}
					aria-label="Открыть приглашение"
				>
					<img
						src={weddingData.couplePhotoUrl}
						alt="Мы приглашаем вас на нашу свадьбу"
					/>
				</button>
			</motion.div>

			{/* ── Полноэкранное фото — круговое раскрытие (iris wipe) ── */}
			<div
				className={`cp-reveal ${isRevealing ? "cp-reveal--open" : ""}`}
			>
				<img
					className="cp-reveal-img"
					src={weddingData.couplePhotoUrl}
					alt=""
					aria-hidden
				/>
			</div>

			{/* ── Кинематографический градиент поверх фото ── */}
			<motion.div
				className="cp-cinema"
				initial={false}
				animate={
					phase === "expand"
						? { opacity: 0.4 }
						: phase === "settle"
							? { opacity: 1 }
							: { opacity: 0 }
				}
				transition={{ duration: phase === "expand" ? 2.4 : 1.2 }}
			/>

			{/* ── Settle-контент: каскадное появление поверх фото ── */}
			{phase === "settle" && (
				<div className="cc-wrap">
					{/* Декоративные угловые метки */}
					<motion.div
						className="cc-corners"
						aria-hidden
						initial={{ opacity: 0, scale: 1.06 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
					>
						<span className="cc-corner cc-corner--tl" />
						<span className="cc-corner cc-corner--tr" />
						<span className="cc-corner cc-corner--bl" />
						<span className="cc-corner cc-corner--br" />
					</motion.div>

					{/* Имя жениха */}
					<motion.p
						className="cc-name"
						initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
						animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
						transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
					>
						{weddingData.groomName}
					</motion.p>

					{/* Разделитель: линия — & — линия */}
					<motion.div
						className="cc-divider"
						initial={{ opacity: 0, scaleX: 0 }}
						animate={{ opacity: 1, scaleX: 1 }}
						transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
					>
						<span className="cc-divider-line" />
						<span className="cc-divider-amp">&</span>
						<span className="cc-divider-line" />
					</motion.div>

					{/* Имя невесты */}
					<motion.p
						className="cc-name"
						initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
						animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
						transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 0.61, 0.36, 1] }}
					>
						{weddingData.brideName}
					</motion.p>

					{/* Дата и место */}
					<motion.div
						className="cc-meta"
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.95, ease: "easeOut" }}
					>
						<time className="cc-date" dateTime={weddingData.weddingDate.toISOString()}>
							{weddingData.weddingDate.toLocaleDateString("ru-RU", {
								day: "numeric",
								month: "long",
								year: "numeric"
							})}
						</time>
						<span className="cc-venue">{weddingData.venue}</span>
					</motion.div>

					{/* Scroll-индикатор */}
					<motion.div
						className="cc-scroll"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 1.4 }}
					>
						<span className="cc-scroll-label">Листайте вниз</span>
						<motion.span
							className="cc-scroll-arrow"
							animate={{ y: [0, 6, 0] }}
							transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
							aria-hidden
						>
							<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
								<path d="M12 5v14M5 12l7 7 7-7" />
							</svg>
						</motion.span>
					</motion.div>
				</div>
			)}

			{/* ── Подсказка ── */}
			<AnimatePresence>
				{phase === "idle" && (
					<motion.p
						key="hint"
						className="couple-photo-hint"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0, y: 12, filter: "blur(6px)" }}
						transition={{ delay: 1.2, duration: 0.5 }}
					>
						Нажмите на фото, чтобы открыть приглашение
					</motion.p>
				)}
			</AnimatePresence>
		</motion.div>
	);
}
