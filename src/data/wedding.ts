/** Путь к аудио в public/. */
export const weddingData = {
	musicUrl: "/perfect.mp3",
	/** Фото пары на первом экране (при клике открывается приглашение). Путь от корня сайта для совместимости с мессенджерами и PWA. */
	couplePhotoUrl: "/rh.jpeg",
	groomName: "Kerim",
	brideName: "Aýnur",
	/** Телефоны для связи */
	groomPhone: "+993 65XXXXXX",
	bridePhone: "+993 63XXXXXX",
	/** Логотип в блоке контактов (путь в public/) */
	logoUrl: "/logo-red.png",
	/** Доп. контакт (организатор и т.д.) */
	organizerPhone: "+993 62090252",
	organizerPhone2: "+993 61484840",
	organizerLabel: "Ваш заказ наша ответственность!",
	/** Ссылка на Instagram */
	instagramUrl: "https://www.instagram.com/invitationsred",
	instagramLabel: "Instagram",
	weddingDate: new Date("2026-08-15T17:00:00"),
	venue: "Berkarar",
	venueAddress: "ул. Махтумкули, Ашхабад",
	/** Фото ресторана (URL или путь в public/) */
	venuePhotoUrl: "https://picsum.photos/800/450?random=venue7",
	/** Ссылка на карту (Google Maps и т.д.) */
	mapUrl:
		"https://www.google.com/maps/place/Berkarar+Mall/@37.9502,58.3798,17z",
	schedule: [
		{
			time: "17:00",
			title: "Встреча гостей",
			description: "Приветственные напитки и общение в зале"
		},
		{
			time: "18:00",
			title: "Церемония бракосочетания",
			description: "Торжественная церемония в банкетном зале Berkarar"
		},
		{
			time: "19:30",
			title: "Праздничный банкет",
			description: "Изысканный ужин и поздравления"
		},
		{
			time: "21:00",
			title: "Свадебный торт",
			description: "Сладкий момент вечера и первый танец"
		},
		{
			time: "22:00",
			title: "Танцы и веселье",
			description: "Музыка, танцы и незабываемые эмоции"
		},
		{
			time: "23:30",
			title: "Прощание с гостями",
			description: "Благодарность и тёплые прощания"
		}
	],
	photos: [
		"https://picsum.photos/400/500?random=71",
		"https://picsum.photos/400/500?random=72",
		"https://picsum.photos/400/500?random=73",
		"https://picsum.photos/400/500?random=74",
		"https://picsum.photos/400/500?random=75",
		"https://picsum.photos/400/500?random=76"
	]
} as const;
