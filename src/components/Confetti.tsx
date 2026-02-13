import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

interface ConfettiProps {
	/** Запуск конфетти при переключении на true */
	fire: boolean;
	/** Текущая тема для выбора цвета конфетти */
	theme?: "ivory" | "gold";
}

/* ── Палитры для каждой темы ── */
const PALETTES = {
	ivory: {
		primary: ["#ffffff", "#e8eef4", "#c8d6e0", "#a3bdd4"],
		accent: ["#1b3a5c", "#4a6d8c", "#6b93b8"],
		shimmer: ["#f0f4f8", "#dce6ef"],
	},
	gold: {
		primary: ["#ffffff", "#f5ecd0", "#f0e0b0", "#e8d490"],
		accent: ["#c9a84c", "#b8942e", "#9e7a1a"],
		shimmer: ["#faf3e0", "#f5eacc"],
	},
} as const;

/* ── SVG-path для сердца (canvas-confetti custom shape) ── */
const heartShape = confetti.shapeFromPath({
	path: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
});

/**
 * Многофазный праздничный эффект:
 *
 * Phase 1 (0.0s)  — Мягкий центральный взрыв вверх (фейерверк)
 * Phase 2 (0.3s)  — Боковые пушки (левая + правая) с конфетти
 * Phase 3 (0.8s)  — Каскад «звёзд» сверху
 * Phase 4 (1.5s)  — Мягкое облако сердец из центра
 * Phase 5 (2.5s)  — Непрерывный мерцающий «снегопад» (3 сек)
 * Phase 6 (6.0s)  — Финальный залп-фейерверк
 */
export function Confetti({ fire, theme = "ivory" }: ConfettiProps) {
	const hasFired = useRef(false);

	useEffect(() => {
		if (!fire || hasFired.current) return;
		hasFired.current = true;

		const palette = PALETTES[theme];
		const allColors = [...palette.primary, ...palette.accent];
		const shimmerColors = [...palette.shimmer];
		const timers: ReturnType<typeof setTimeout>[] = [];
		let snowRaf = 0;

		const delay = (ms: number, fn: () => void) => {
			timers.push(setTimeout(fn, ms));
		};

		/* ── Phase 1: Центральный фейерверк вверх ── */
		delay(200, () => {
			confetti({
				particleCount: 60,
				spread: 70,
				startVelocity: 55,
				origin: { x: 0.5, y: 0.75 },
				colors: allColors,
				ticks: 280,
				gravity: 0.9,
				scalar: 1.15,
				shapes: ["circle", "square"],
			});
		});

		/* ── Phase 2: Боковые пушки ── */
		delay(500, () => {
			// Левая пушка
			confetti({
				particleCount: 40,
				angle: 55,
				spread: 60,
				startVelocity: 50,
				origin: { x: 0, y: 0.65 },
				colors: allColors,
				ticks: 260,
				gravity: 0.85,
				scalar: 1.05,
				drift: 0.4,
				shapes: ["square", "circle"],
			});
			// Правая пушка
			confetti({
				particleCount: 40,
				angle: 125,
				spread: 60,
				startVelocity: 50,
				origin: { x: 1, y: 0.65 },
				colors: allColors,
				ticks: 260,
				gravity: 0.85,
				scalar: 1.05,
				drift: -0.4,
				shapes: ["square", "circle"],
			});
		});

		/* ── Phase 3: Каскад звёзд сверху ── */
		delay(1000, () => {
			for (let i = 0; i < 3; i++) {
				delay(i * 200, () => {
					confetti({
						particleCount: 18,
						spread: 140,
						startVelocity: 20,
						origin: { x: 0.2 + Math.random() * 0.6, y: -0.05 },
						colors: shimmerColors,
						ticks: 300,
						gravity: 0.4,
						scalar: 1.4,
						shapes: ["star"],
						flat: true,
					});
				});
			}
		});

		/* ── Phase 4: Облако сердец ── */
		delay(1800, () => {
			confetti({
				particleCount: 25,
				spread: 90,
				startVelocity: 30,
				origin: { x: 0.5, y: 0.5 },
				colors: theme === "gold"
					? ["#c9a84c", "#e8d490", "#ffffff"]
					: ["#a3bdd4", "#c8d6e0", "#ffffff"],
				ticks: 320,
				gravity: 0.45,
				scalar: 1.6,
				shapes: [heartShape],
				flat: true,
			});
		});

		/* ── Phase 5: Мерцающий «снегопад» ── */
		delay(2800, () => {
			const snowEnd = Date.now() + 3000;

			const snowFrame = () => {
				if (Date.now() > snowEnd) return;

				confetti({
					particleCount: 2,
					spread: 180,
					startVelocity: 8,
					origin: { x: Math.random(), y: -0.02 },
					colors: shimmerColors,
					ticks: 400,
					gravity: 0.25,
					scalar: 0.7,
					drift: (Math.random() - 0.5) * 0.6,
					shapes: ["circle"],
				});

				snowRaf = requestAnimationFrame(snowFrame);
			};

			snowFrame();
		});

		/* ── Phase 6: Финальный залп-фейерверк ── */
		delay(6200, () => {
			// Три точки запуска
			const origins = [
				{ x: 0.25, y: 0.55 },
				{ x: 0.5, y: 0.45 },
				{ x: 0.75, y: 0.55 },
			];

			origins.forEach((origin, i) => {
				delay(i * 150, () => {
					confetti({
						particleCount: 55,
						spread: 80,
						startVelocity: 45,
						origin,
						colors: allColors,
						ticks: 300,
						gravity: 0.7,
						scalar: 1.2,
						shapes: ["circle", "square", "star"],
					});
				});
			});
		});

		return () => {
			timers.forEach(clearTimeout);
			cancelAnimationFrame(snowRaf);
		};
	}, [fire, theme]);

	return null;
}
