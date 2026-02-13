import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

interface ConfettiProps {
	/** Запуск конфетти при переключении на true */
	fire: boolean;
	/** Текущая тема для выбора цвета конфетти */
	theme?: "bw" | "rose";
}

const THEME_COLORS = {
	bw: ["#ffffff", "#1a1a1a", "#d4d4d4", "#333333"],
	rose: ["#ffffff", "#8b3a4a", "#c47a8a", "#e5c1ca"],
};

export function Confetti({ fire, theme = "bw" }: ConfettiProps) {
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
