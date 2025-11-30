const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

const WEBHOOK_BASE_URL = 'https://rb229169.leadteh.ru/inner_webhook/22515d19-26f2-4eee-9a09-a5bfe9d4ffc9';

tg.MainButton.setText('Закрыть Mini App').show();
tg.MainButton.onClick(() => tg.close());

// Отправка команды в Leadteh через скрытое окно (как раньше)
function sendCommandToLeadteh(command) {
    const userId = tg.initDataUnsafe?.user?.id;
    if (!userId) return;

    const url = `${WEBHOOK_BASE_URL}?contact_by=telegram_id&search=${userId}&command=${encodeURIComponent(command)}`;

    // Открываем скрытое окно
    const w = window.open(url, "_blank", "width=100,height=100,opacity=0");

    // Закрываем через 300 мс
    setTimeout(() => {
