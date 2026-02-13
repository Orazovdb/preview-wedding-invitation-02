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

			{/* ── Settle: кинематографическая «title card» ── */}
			{phase === "settle" && (
				<div className="cc-wrap">
					{/* Frosted glass card */}
					<motion.div
						className="cc-card"
						initial={{ opacity: 0, y: 30, scale: 0.96 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						transition={{ duration: 1, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
					>
						{/* Label */}
						<motion.span
							className="cc-label"
							initial={{ opacity: 0, letterSpacing: "0.6em" }}
							animate={{ opacity: 1, letterSpacing: "0.3em" }}
							transition={{ duration: 0.9, delay: 0.4 }}
						>
							Свадьба
						</motion.span>

						{/* Date large display */}
						<motion.div
							className="cc-date-display"
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
						>
							<span className="cc-date-day">
								{String(weddingData.weddingDate.getDate()).padStart(2, "0")}
							</span>
							<span className="cc-date-sep" aria-hidden />
							<div className="cc-date-right">
								<span className="cc-date-month">
									{weddingData.weddingDate.toLocaleDateString("ru-RU", { month: "long" })}
								</span>
								<span className="cc-date-year">
									{weddingData.weddingDate.getFullYear()}
								</span>
							</div>
						</motion.div>

						{/* Ornamental rule */}
						<motion.div
							className="cc-rule"
							initial={{ scaleX: 0, opacity: 0 }}
							animate={{ scaleX: 1, opacity: 1 }}
							transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
						>
							<span className="cc-rule-line" />
							<span className="cc-rule-diamond" aria-hidden>✦</span>
							<span className="cc-rule-line" />
						</motion.div>

						{/* Couple names */}
						<motion.h2
							className="cc-names"
							initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
							animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
							transition={{ duration: 0.8, delay: 0.85, ease: [0.22, 0.61, 0.36, 1] }}
						>
							{weddingData.groomName}
							<span className="cc-names-amp">&</span>
							{weddingData.brideName}
						</motion.h2>

						{/* Venue */}
						<motion.span
							className="cc-venue"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 1.1 }}
						>
							{weddingData.venue} · {weddingData.venueAddress}
						</motion.span>
					</motion.div>

					{/* Scroll indicator — mouse icon */}
					<motion.div
						className="cc-scroll"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 1.5 }}
					>
						<span className="cc-mouse" aria-hidden>
							<motion.span
								className="cc-mouse-dot"
								animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
								transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
							/>
						</span>
						<span className="cc-scroll-label">Листайте</span>
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
