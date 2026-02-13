/** Путь к аудио в public/. Положите файл "I Think They Call This Love" как i-think-they-call-this-love.mp3 */
export const weddingData = {
	musicUrl: "/perfect.mp3",
	/** Фото пары на первом экране (при клике открывается приглашение). Путь от корня сайта для совместимости с мессенджерами и PWA. */
	couplePhotoUrl: "/rh.jpeg",
	groomName: "Myrat",
	brideName: "Melike",
	/** Телефоны для связи */
	groomPhone: "+993 71XXXXXX",
	bridePhone: "+993 61XXXXXX",
	/** Логотип в блоке контактов (путь в public/) */
	logoUrl: "/logo-red.png",
	/** Доп. контакт (организатор и т.д.) */
	organizerPhone: "+993 62090252",
	organizerPhone2: "+993 61484840",
	organizerLabel: "Ваш заказ наша ответственность!",
	/** Ссылка на Instagram */
	instagramUrl: "https://www.instagram.com/invitationsred",
	instagramLabel: "Instagram",
	weddingDate: new Date("2026-05-23T18:00:00"),
	venue: "Bagtyýarlyk",
	venueAddress: "пр. Битарап Туркменистан, Ашхабад",
	/** Фото ресторана (URL или путь в public/) */
	venuePhotoUrl: "https://picsum.photos/800/450?random=venue3",
	/** Ссылка на карту (Google Maps и т.д.) */
	mapUrl:
		"https://www.google.com/maps/place/%D0%A2%D0%A0%D0%A6+%C2%AB%D0%91%D0%B0%D0%B3%D1%82%D1%8B%D1%8F%D1%80%D0%BB%D1%8B%D0%BA%C2%BB/@37.9170848,58.3657585,874m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3f70020b1b15c45f:0x41bd73daa974168!8m2!3d37.9170806!4d58.3683334!16s%2Fg%2F11cn17v7m2?entry=ttu&g_ep=EgoyMDI2MDIxMC4wIKXMDSoASAFQAw%3D%3D",
	schedule: [
		{
			time: "18:00",
			title: "Прибытие гостей",
			description: "Встреча гостей, welcome-напитки и лёгкая атмосфера"
		},
		{
			time: "19:00",
			title: "Начало банкета",
			description: "Торжественный ужин в ресторане Bagtyýarlyk"
		},
		{
			time: "21:00",
			title: "Самый сладкий момент вечера",
			description: "Свадебный торт и поздравления"
		},
		{
			time: "22:00",
			title: "Сияющий финал",
			description: "Танцы и развлечения"
		},
		{
			time: "23:00",
			title: "Завершение вечера",
			description: "Прощание с гостями"
		}
	],
	photos: [
		"https://picsum.photos/400/500?random=11",
		"https://picsum.photos/400/500?random=22",
		"https://picsum.photos/400/500?random=33",
		"https://picsum.photos/400/500?random=44",
		"https://picsum.photos/400/500?random=55",
		"https://picsum.photos/400/500?random=66"
	]
} as const;
