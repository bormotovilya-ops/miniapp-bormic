const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// 🚨 URL вашего Стандартного входящего webhook Leadteh
const WEBHOOK_BASE_URL = 'https://rb229169.leadteh.ru/inner_webhook/22515d19-26f2-4eee-9a09-a5bfe9d4ffc9';

// Главная кнопка
tg.MainButton.setText('Закрыть Mini App').show();
tg.MainButton.onClick(() => tg.close());


// ---------------------------------------------------------
// 🔥 ТИХИЙ GET-ЗАПРОС В LEADTEH (без открытия JSON-страницы)
// ---------------------------------------------------------
async function sendGetRequest(command) {
    const userId = tg.initDataUnsafe.user?.id;

    if (!userId) {
        console.error('User ID not available.');
        return;
    }

    const finalUrl = `${WEBHOOK_BASE_URL}?contact_by=telegram_id&search=${userId}&command=${command}`;

    try {
        const response = await fetch(finalUrl, {
            method: 'GET',
            mode: 'no-cors'
        });
        // no-cors → Mini App не видит ответ, но Leadteh получает запрос
    } catch (err) {
        console.error('Webhook error:', err);
    }
}


// ---------------------------------------------------------
// 🎬 Обработка кнопок в Mini App
// ---------------------------------------------------------
const workButtons = document.querySelectorAll('.work-btn');

workButtons.forEach(button => {
    button.onclick = async (e) => {
        e.preventDefault();

        const command = button.getAttribute('data-command');
        const url = button.getAttribute('data-url');

        // Отправляем скрытый запрос в Leadteh
        if (command) {
            await sendGetRequest(command);
        }

        // Открываем внешний URL (если есть)
        if (url) {
            tg.openLink(url);
        }

        tg.close();
    };
});
вот так можно было, теперь json лишний не всплывает
