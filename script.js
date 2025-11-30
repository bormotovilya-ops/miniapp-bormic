const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// 🚨 URL вашего Стандартного входящего webhook Leadteh (тот, что на 200 Ok)
const WEBHOOK_BASE_URL = 'https://rb229169.leadteh.ru/inner_webhook/22515d19-26f2-4eee-9a09-a5bfe9d4ffc9'; 
//const WEBHOOK_BASE_URL = 'https://rb229169.leadteh.ru/inner_webhook/js/19846c85-8252-419d-942c-7e4dc8151977'; 


tg.MainButton.setText('Закрыть Mini App').show();
tg.MainButton.onClick(() => tg.close());


// Функция для отправки данных через GET-параметры (tg.openLink)
function sendGetRequest(command) {
    const userId = tg.initDataUnsafe.user?.id;

    if (!userId) {
        console.error('User ID not available.');
        return; 
    }

    // Собираем полный URL с параметрами: ?contact_by=...&search=...&command=...
    const finalUrl = `${WEBHOOK_BASE_URL}?contact_by=telegram_id&search=${userId}&command=${command}`;

    // 🔥 ИСПОЛЬЗУЕМ tg.openLink - Это гарантирует отправку запроса.
    tg.openLink(finalUrl); 
}


// Обработка кнопок в Mini App
const workButtons = document.querySelectorAll('.work-btn');

workButtons.forEach(button => {
    button.onclick = (e) => {
        e.preventDefault();
        
        const command = button.getAttribute('data-command');
        const url = button.getAttribute('data-url');
        
        // Отправляем команду
        if (command) {
            sendGetRequest(command);
        }
        
        // Открываем ссылку (если она есть)
        if (url) {
            // Если есть внешний URL, мы его тоже открываем
            tg.openLink(url); 
        } 
        
        // Здесь мы ЗАКРЫВАЕМ Mini App сразу.
        // Пользователь увидит JSON-страницу LeadTeh, но она сразу исчезнет, 
        // оставив только результат (запуск сценария).
        tg.close(); 
    };
});
