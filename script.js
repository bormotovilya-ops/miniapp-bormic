const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// 🚨 ВАШ WebHook URL ИЗ LEADTEH (ЛУЧШЕ СТАНДАРТНЫЙ WEBHOOK)
const WEBHOOK_BASE_URL = 'https://rb229169.leadteh.ru/inner_webhook/js/19846c85-8252-419d-942c-7e4dc8151977'; 

// 1. Устанавливаем Главную кнопку Telegram для закрытия
tg.MainButton.setText('Закрыть Mini App').show();
tg.MainButton.onClick(() => tg.close());


// Функция для отправки данных через GET-параметры
function sendGetRequest(command) {
    const userId = tg.initDataUnsafe.user ? tg.initDataUnsafe.user.id : null;

    if (!userId) {
        console.error('User ID not available.');
        return; 
    }

    // Собираем полный URL с параметрами:
    // ?contact_by=telegram_id&search=123456&command=MiniApp_vizitka_view
    const finalUrl = `${WEBHOOK_BASE_URL}?contact_by=telegram_id&search=${userId}&command=${command}`;

    // Открываем URL в фоне. Это и есть наш GET-запрос.
    tg.openLink(finalUrl); 
    
    // Внимание: Mini App закроется сразу после этого действия, так как нет задержки
}


// 2. Слушаем все кнопки с работами
const workButtons = document.querySelectorAll('.work-btn');

workButtons.forEach(button => {
    button.onclick = (e) => {
        const command = button.getAttribute('data-command');
        const url = button.getAttribute('data-url');
        
        // Отправляем команду
        if (command) {
            sendGetRequest(command);
        }
        
        // Открываем ссылку (если она есть)
        if (url) {
            tg.openLink(url); 
        } 
        
        // Сразу закрываем Mini App.
        tg.close(); 
        
        e.preventDefault(); 
    };
});
