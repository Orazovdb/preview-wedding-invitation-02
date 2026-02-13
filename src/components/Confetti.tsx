import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

interface ConfettiProps {
	/** Запуск конфетти при переключении на true */
	fire: boolean;
	/** Текущая тема для выбора цвета конфетти */
	theme?: "ivory" | "gold";
}

const THEME_COLORS = {
	ivory: ["#ffffff", "#1b3a5c", "#4a6d8c", "#c8d6e0"],
	gold: ["#ffffff", "#9e7a1a", "#c9a84c", "#f0e0b0"],
};

export function Confetti({ fire, theme = "ivory" }: ConfettiProps) {
	const hasFired = useRef(false);

	useEffect(() => {
		if (!fire || hasFired.current) return;
		hasFired.current = true;

		const duration = 4000;
		const end = Date.now() + duration;

		const colors = THEME_COLORS[theme];

		const frame = () => {
			confetti({
				particleCount: 3,
				angle: 60,
				spread: 65,
				origin: { x: 0, y: 0.6 },
				colors,
				ticks: 200,
				gravity: 0.8,
				scalar: 1.1,
				drift: 0.2,
			});
			confetti({
				particleCount: 3,
				angle: 120,
				spread: 65,
				origin: { x: 1, y: 0.6 },
				colors,
				ticks: 200,
				gravity: 0.8,
				scalar: 1.1,
				drift: -0.2,
			});

			if (Date.now() < end) {
				requestAnimationFrame(frame);
			}
		};

		// Небольшая задержка, чтобы контент успел появиться
		const timer = setTimeout(() => {
			frame();

			// Финальный залп по центру
			setTimeout(() => {
				confetti({
					particleCount: 80,
					spread: 100,
					origin: { x: 0.5, y: 0.4 },
					colors,
					ticks: 250,
					gravity: 0.6,
					scalar: 1.2,
				});
			}, duration - 500);
		}, 300);

		return () => clearTimeout(timer);
	}, [fire, theme]);

	return null;
}
