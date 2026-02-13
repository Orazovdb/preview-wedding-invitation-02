import "./ThemeToggle.css";

interface ThemeToggleProps {
	theme: "ivory" | "gold";
	onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
	return (
		<button
			type="button"
			className="theme-toggle"
			onClick={onToggle}
			aria-label="Сменить тему"
			title={theme === "ivory" ? "Золотая тема" : "Тема «Слоновая кость»"}
		>
			<span className="theme-toggle-icon">
				{theme === "ivory" ? (
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
					</svg>
				) : (
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<path d="M12 2L2 7l10 5 10-5-10-5z" />
						<path d="M2 17l10 5 10-5" />
						<path d="M2 12l10 5 10-5" />
					</svg>
				)}
			</span>
		</button>
	);
}
