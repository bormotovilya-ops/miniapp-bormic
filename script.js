const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

const WEBHOOK_BASE_URL = 'https://rb229169.leadteh.ru/inner_webhook/22515d19-26f2-4eee-9a09-a5bfe9d4ffc9';

tg.MainButton.setText('Закрыть Mini App').show();
tg.MainButton.onClick(() => tg.close());

// Функция отправки команды в Leadteh (тихий запрос)
function sendCommandToLeadteh(command) {
    const userId = tg.initDataUnsafe?.user?.id;
    if (!userId) return;

    const url = `${WEBHOOK_BASE_URL}?contact_by=telegram_id&search=${userId}&command=${command}`;

    // Тихий запрос — лог Leadteh отработает, JSON в MiniApp НЕ всплывет
    fetch(url, {
        method: 'GET',
        mode: 'no-cors'
    }).catch(() => {});
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
