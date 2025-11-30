const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// Твой webhook Leadteh
const WEBHOOK_BASE_URL = 'https://rb229169.leadteh.ru/inner_webhook/22515d19-26f2-4eee-9a09-a5bfe9d4ffc9';

// Главная кнопка
tg.MainButton.setText('Закрыть Mini App').show();
tg.MainButton.onClick(() => tg.close());

// --- 🔥 Рабочая отправка command через скрытое окно ---
function sendCommandToLeadteh(command) {
    const userId = tg.initDataUnsafe?.user?.id;
    if (!userId) {
        console.error('User ID not available');
        return;
    }
