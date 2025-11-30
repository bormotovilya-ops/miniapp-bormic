const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// 🚨 URL'ы для тихого запуска
const SILENT_WEBHOOK_MAP = {
    // ВСТАВЬТЕ ВАШ НОВЫЙ URL СЮДА
    "MiniApp_concert_view": "https://rb229169.leadteh.ru/inner_webhook/js/101b3f58-2a62-43b6-8e56-63e3ec17c52a", 
    // ... здесь будут остальные ваши кейсы ...
};

tg.MainButton.setText('Закрыть Mini App').show();
tg.MainButton.onClick(() => tg.close());

// Функция, использующая tg.openLink с уникальным URL
function sendSilentCommand(command) {
    const userId = tg.initDataUnsafe.user?.id;
    const WEBHOOK_BASE_URL = SILENT_WEBHOOK_MAP[command];

    if (!userId || !WEBHOOK_BASE_URL) { return; }

    const finalUrl = `${WEBHOOK_BASE_URL}?contact_by=telegram_id&search=${userId}`;

    // Используем tg.openLink для гарантированной отправки запроса
    tg.openLink(finalUrl); 
}

// 🎬 Обработка кнопок в Mini App
const workButtons = document.querySelectorAll('.work-btn');

workButtons.forEach(button => {
    button.onclick = (e) => {
        e.preventDefault();
        
        const command = button.getAttribute('data-command');
        
        if (command && command === "MiniApp_concert_view") { // Проверяем только 'Концерт'
            sendSilentCommand(command);
        }
        
        // Закрываем Mini App сразу
        tg.close(); 
    };
});
