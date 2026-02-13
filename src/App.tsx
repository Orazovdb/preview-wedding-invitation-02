import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { Confetti } from "./components/Confetti";
import { CouplePhoto } from "./components/CouplePhoto";
import { InvitationContent } from "./components/InvitationContent";
import { ThemeToggle } from "./components/ThemeToggle";
import { weddingData } from "./data/wedding";

type Theme = "ivory" | "gold";

function getInitialTheme(): Theme {
	try {
		const saved = localStorage.getItem("wedding-theme");
		if (saved === "ivory" || saved === "gold") return saved;
	} catch {
		/* ignore */
	}
	return "ivory";
}

function App() {
	const [isOpen, setIsOpen] = useState(false);
	const [theme, setTheme] = useState<Theme>(getInitialTheme);
	const audioRef = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		window.scrollTo(0, 0);
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
	}, []);

	useEffect(() => {
		document.body.style.overflow = isOpen ? "" : "hidden";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	useEffect(() => {
		if (theme === "gold") {
			document.documentElement.setAttribute("data-theme", "gold");
		} else {
			document.documentElement.removeAttribute("data-theme");
		}
		try {
			localStorage.setItem("wedding-theme", theme);
		} catch {
			/* ignore */
		}
	}, [theme]);

	const handleOpenInvitation = () => {
		setIsOpen(true);
	};

	const unlockAudio = () => {
		audioRef.current?.play().catch(() => {});
	};

	const toggleTheme = useCallback(() => {
		setTheme(prev => (prev === "ivory" ? "gold" : "ivory"));
	}, []);

	return (
		<div className="app">
			<Analytics />
			<SpeedInsights route="/" />
			<ThemeToggle theme={theme} onToggle={toggleTheme} />
			<Confetti fire={isOpen} theme={theme} />
			<audio
				ref={audioRef}
				src={weddingData.musicUrl}
				loop
				preload="metadata"
				aria-label="Фоновая музыка приглашения"
			/>
			<AnimatePresence mode="wait">
				<CouplePhoto
					key="couple-photo"
					onOpen={handleOpenInvitation}
					onUnlockAudio={unlockAudio}
				/>
				<InvitationContent key="content" />
			</AnimatePresence>
		</div>
	);
}

export default App;
