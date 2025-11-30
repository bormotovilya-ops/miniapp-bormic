const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

const WEBHOOK_BASE_URL = 'https://rb229169.leadteh.ru/inner_webhook/22515d19-26f2-4eee-9a09-a5bfe9d4ffc9';

tg.MainButton.setText('Закрыть Mini App').show();
tg.MainButton.onClick(() => tg.close());

function sendCommandToLeadteh(command) {
    const userId = tg.initDataUnsafe?.user?.id;
    if (!userId) return;

    const url = `${WEBHOOK_BASE_URL}?contact_by=telegram_id&search=${userId}&command=${command}`;

    // Создаем скрытый iframe
    const iframe = document.createElement('iframe');
    iframe.style.width = "1px";
    iframe.style.height = "1px";
    iframe.style.opacity = "0";
    iframe.style.position = "absolute";
    iframe.style.left = "-9999px";
    iframe.src = url;

    document.body.appendChild(iframe);

    // Удаляем iframe через 1 секунду
    setTimeout(() => {
        iframe.remove();
    }, 1000);
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
