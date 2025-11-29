const tg = window.Telegram.WebApp;
const WEBHOOK_URL = 'https://rb229169.leadteh.ru/inner_webhook/8d3ed841-0230-40a6-b7bc-2edd55cc451b'; // 🚨 ВАШ URL СТАНДАРТНОГО WEBHOOK

tg.ready();
tg.expand();
tg.MainButton.setText('Закрыть Mini App').show();
tg.MainButton.onClick(() => tg.close());

// Функция для отправки данных через POST (в фоне)
function sendWebhookData(command) {
    const userId = tg.initDataUnsafe.user ? tg.initDataUnsafe.user.id : null;
    if (!userId) { return; }

    // Payload для Стандартного Webhook (используем имена, нужные LeadTeh для поиска)
    const payload = {
        contact_by: "telegram_id",
        search: String(userId),
        command: command // Наша команда, которую LeadTeh должен сохранить
    };

    fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    }).catch(error => {
        console.error('Ошибка сети:', error);
    });
}

// Слушаем кнопки
document.querySelectorAll('.work-btn').forEach(button => {
    button.onclick = (e) => {
        const command = button.getAttribute('data-command');
        const url = button.getAttribute('data-url');
        
        if (command) {
            sendWebhookData(command); // Отправка в фоне
        }
        if (url) {
            tg.openLink(url); 
        } 
        
        // Закрываем Mini App
        setTimeout(() => tg.close(), 500); 
        e.preventDefault(); 
    };
});
