const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

const WEBHOOK_BASE_URL = 'https://rb229169.leadteh.ru/inner_webhook/22515d19-26f2-4eee-9a09-a5bfe9d4ffc9';

tg.MainButton.setText('Закрыть Mini App').show();
tg.MainButton.onClick(() => tg.close());


// Функция отправки команды в Leadteh (с сохранением в переменную)
function sendCommandToLeadteh(command) {
    const userId = tg.initDataUnsafe?.user?.id;
    if (!userId) return;

    // Сохраняем команду сразу в переменную контакта:
    // variables[MiniAppCommandFinal] = <command>
    const url =
        `${WEBHOOK_BASE_URL}?contact_by=telegram_id&search=${userId}` +
        `&variables[MiniAppCommandFinal]=${encodeURIComponent(command)}`;

    // Открываем скрытое мини-окно, чтобы не показывать JSON
    const w = window.open(url, "_blank", "width=1,height=1,opacity=0");

    setTimeout(() => {
        try { w?.close(); } catch {}
    }, 300);
}


// Обработка кнопок
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
