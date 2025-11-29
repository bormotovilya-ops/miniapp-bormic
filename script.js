const tg = window.Telegram.WebApp;
// ВАШ WEBHOOK URL ИЗ LEADTEH
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
        console.error('User ID not available, cannot send Webhook.');
        return; 
    }

    // 🚨 НОВЫЙ PAYLOAD, соответствующий требованиям LeadTeh
    const payload = {
        // 1. Критерий поиска: ищем по Telegram ID
        "contact_by": "telegram_id",
        // 2. Искомое значение: ID текущего пользователя
        "search": String(userId), // Передаем ID как строку, как требует LeadTeh
        // 3. Переменные, которые нужно назначить (сюда кладем нашу команду)
        "variables": {
            // Переменная, которую LeadTeh сохранит для дальнейшей обработки
            "MiniApp_Command": command 
        }
    };

    fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
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
            sendWebhookData(command);
        }
        
        if (url) {
            tg.openLink(url); 
        } 
        
        // Закрываем Mini App
        setTimeout(() => {
            tg.close();
        }, 500); 
        
        e.preventDefault(); 
    };
});
