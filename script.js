const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

const WEBHOOK_BASE_URL = 'https://rb229169.leadteh.ru/inner_webhook/22515d19-26f2-4eee-9a09-a5bfe9d4ffc9';

tg.MainButton.setText('Закрыть Mini App').show();
tg.MainButton.onClick(() => tg.close());

// Тихий запрос через Image Ping
function sendCommandToLeadteh(command) {
    const userId = tg.initDataUnsafe?.user?.id;
    if (!userId) return;

    const url = `${WEBHOOK_BASE_URL}?contact_by=telegram_id&search=${userId}&command=${encodeURIComponent(command)}`;

    // Тихий GET — никого не трогаем, ничего не показываем
    const img = new Image();
    img.src = url;

    // Для очистки памяти (опционально)
    img.onload = img.onerror = () => {
        img.remove();
    };
}

const workButtons = document.querySelectorAll('.work-btn');

workButtons.forEach(button => {
    button.onclick = (e) => {
        e.preventDefault();

        const command = button.getAttribute('data-command');
        const url = button.getAttribute('data-url');

        if (command) {
            sendCommandToLeadteh(command);
        }

        if (url) {
            tg.openLink(url);
        }

        tg.close();
    };
});
