const tg = window.Telegram.WebApp;
// 🚨 ВСТАВЬТЕ СЮДА ВАШ УНИКАЛЬНЫЙ WEBHOOK URL ИЗ LEADTEH
const WEBHOOK_URL = 'https://rb229169.leadteh.ru/inner_webhook/8d3ed841-0230-40a6-b7bc-2edd55cc451b'; 

tg.ready();
tg.expand();

// 1. Устанавливаем Главную кнопку Telegram для закрытия
tg.MainButton.setText('Закрыть Mini App').show();
tg.MainButton.onClick(() => tg.close());


// Функция для отправки данных через Webhook
function sendWebhookData(command) {
    // Получаем ID пользователя для привязки данных в LeadTeh
    const userId = tg.initDataUnsafe.user ? tg.initDataUnsafe.user.id : null;

    if (!userId) {
        // Если ID пользователя недоступен, не отправляем Webhook
        console.error('User ID not available, cannot send Webhook.');
        return; 
    }

    // Создаем объект данных для отправки
    const payload = {
        // Ключевая переменная, которую вы будете ловить в LeadTeh
        command_key: command,
        // ОЧЕНЬ ВАЖНО: передаем Telegram User ID для идентификации в LeadTeh
        user_id: userId,
        // Дополнительно можно передать имя пользователя для логов
        username: tg.initDataUnsafe.user.username || 'N/A' 
    };

    fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
            // Указываем, что отправляем JSON
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (!response.ok) {
            console.error('Ошибка отправки Webhook:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Ошибка сети при отправке Webhook:', error);
    });
}


// 2. Слушаем все кнопки с работами
const workButtons = document.querySelectorAll('.work-btn');

workButtons.forEach(button => {
    button.onclick = (e) => {
        const command = button.getAttribute('data-command');
        const url = button.getAttribute('data-url');
        
        if (command) {
            // 🚨 НОВАЯ ЛОГИКА: Отправляем команду через Webhook
            sendWebhookData(command);
         }
        
        // Открываем ссылку (если она есть)
        if (url) {
            tg.openLink(url); 
        } 
        
        // Закрываем Mini App
        setTimeout(() => {
            tg.close();
        }, 500); // Даем время на отправку Webhook
        
        e.preventDefault(); 
    };
});
