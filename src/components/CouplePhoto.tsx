import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { weddingData } from "../data/wedding";
import "./CouplePhoto.css";

interface CouplePhotoProps {
	onOpen: () => void;
	onUnlockAudio?: () => void;
}

const OPEN_DURATION = 3.4;

export function CouplePhoto({ onOpen, onUnlockAudio }: CouplePhotoProps) {
	const [isOpening, setIsOpening] = useState(false);
	const [showContentAfterOpen, setShowContentAfterOpen] = useState(false);

	useEffect(() => {
		if (!isOpening) return;
		const timer = setTimeout(() => {
			setShowContentAfterOpen(true);
		}, OPEN_DURATION * 1000);
		return () => clearTimeout(timer);
	}, [isOpening]);

	const handleClick = () => {
		if (isOpening) return;
		onUnlockAudio?.();
		setIsOpening(true);
	};

	const openingInitial = {
		left: "50%",
		top: "50%",
		x: "-50%",
		y: "-50%",
		scale: 1,
		width: "88vw",
		height: "55vh",
		opacity: 1
	};

	const openingAnimate = {
		left: "50%",
		top: "50%",
		x: "-50%",
		y: "-50%",
		width: "100vw",
		height: "100vh",
		opacity: [1, 1, 0] as number[]
	};

	const idleValues = {
		scale: 1,
		opacity: 1
	};

	return (
		<motion.div
			className="couple-photo-screen"
			initial={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
		>
			{!isOpening && (
				<>
					<div className="couple-photo-top-ornament" aria-hidden>
						<svg viewBox="0 0 120 12" width="80" height="12">
							<line x1="0" y1="6" x2="50" y2="6" stroke="currentColor" strokeWidth="0.5" />
							<circle cx="60" cy="6" r="3" fill="none" stroke="currentColor" strokeWidth="0.5" />
							<circle cx="60" cy="6" r="1" fill="currentColor" />
							<line x1="70" y1="6" x2="120" y2="6" stroke="currentColor" strokeWidth="0.5" />
						</svg>
					</div>
					<h1 className="couple-photo-header">Приглашение на свадьбу</h1>
					<p className="couple-photo-names" aria-hidden>
						{weddingData.groomName}
						<span className="couple-photo-ampersand">&</span>
						{weddingData.brideName}
					</p>
				</>
			)}

			<motion.div
				key={isOpening ? "opening" : "idle"}
				className={`couple-photo-wrap ${
					isOpening ? "couple-photo-wrap--opening" : ""
				}`}
				initial={isOpening ? openingInitial : idleValues}
				animate={isOpening ? openingAnimate : idleValues}
				transition={{
					duration: OPEN_DURATION,
					ease: [0.22, 0.61, 0.36, 1],
					opacity: { times: [1] }
				}}
				onAnimationComplete={() => {
					if (isOpening) onOpen();
				}}
			>
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

			<motion.div
				className="couple-content"
				initial={false}
				animate={
					isOpening && showContentAfterOpen
						? { opacity: 1, y: 0 }
						: { opacity: 0, y: 10 }
				}
				transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
			>
				<h1 className="couple-photo-header">День свадьбы</h1>
				<p className="couple-photo-names couple-photo-names--large" aria-hidden>
					{weddingData.groomName} & {weddingData.brideName}
				</p>
				<div className="couple-content-scroll">
					<div className="couple-content-scroll-line" aria-hidden>
						<motion.div
							className="couple-content-scroll-line-dot"
							animate={{ y: [0, 40 - 8, 0], x: ["-50%"] }}
							transition={{
								duration: 1.8,
								repeat: Infinity,
								ease: "easeInOut"
							}}
						/>
					</div>
					<span className="couple-content-scroll-text">Листайте вниз</span>
				</div>
			</motion.div>

			{!isOpening && (
				<motion.p
					className="couple-photo-hint"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1, duration: 0.5 }}
				>
					Нажмите на фото, чтобы открыть приглашение
				</motion.p>
			)}
		</motion.div>
	);
}
