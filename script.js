const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

tg.MainButton.setText('Закрыть').show();
tg.MainButton.onClick(() => tg.close());

const WEBHOOK_BASE_URL = 'https://rb229169.leadteh.ru/inner_webhook/22515d19-26f2-4eee-9a09-a5bfe9d4ffc9';

// 🔹 1. Передаём команду ВНУТРЬ Leadteh
function sendCommandToLeadteh(cmd) {
    tg.sendData(JSON.stringify({ command: cmd }));
}

// 🔹 2. Тихий вызов вебхука Leadteh (URL — здесь)
async function silentWebhookCall(cmd, userId) {
    const finalUrl = `${WEBHOOK_BASE_URL}?contact_by=telegram_id&search=${userId}&command=${cmd}`;

    try {
        await fetch(finalUrl, { method: "GET", mode: "no-cors" });
    } catch (e) {
        console.error(e);
    }
}

const workButtons = document.querySelectorAll('.work-btn');

workButtons.forEach(btn => {
    btn.onclick = async () => {
        const cmd = btn.dataset.command;
        const url = btn.dataset.url;
        const userId = tg.initDataUnsafe.user?.id;

        if (cmd) {
            sendCommandToLeadteh(cmd);       // передаём command → попадёт в INPUT
            silentWebhookCall(cmd, userId);  // вызываем URL Leadteh тихо
        }

        if (url) {
            tg.openLink(url);
        }

        tg.close();
    };
});
