const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// 🚨 ВСТАВЬТЕ СЮДА URL вашего JavaScript Webhook из LeadTeh!
//const WEBHOOK_URL = 'https://rb229169.leadteh.ru/inner_webhook/js/19846c85-8252-419d-942c-7e4dc8151977'; 
const WEBHOOK_URL = 'https://webhook.site/99d5641f-d42b-4936-9bcc-7c0cfc088930'; 



// 1. Устанавливаем Главную кнопку Telegram для закрытия
tg.MainButton.setText('Закрыть Mini App').show();
tg.MainButton.onClick(() => tg.close());


// Функция для отправки данных через Webhook
function sendWebhookData(command) {
    const userId = tg.initDataUnsafe.user ? tg.initDataUnsafe.user.id : null;

    if (!userId) {
        console.error('User ID not available, cannot send Webhook.');
        return; 
    }
    
    // Структура Payload, требуемая для поиска контакта и назначения переменной
    const payload = {
        "contact_by": "telegram_id",
        "search": String(userId), 
        "variables": {
            // Переменная, которую LeadTeh сохранит
            "MiniApp_Command_Final": command 
        }
    };

    fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })
    .catch(error => {
        console.error('Ошибка сети:', error);
    });
}


// 2. Слушаем все кнопки с работами (с атрибутами data-command)
const workButtons = document.querySelectorAll('.work-btn');

workButtons.forEach(button => {
    button.onclick = (e) => {
        const command = button.getAttribute('data-command');
        const url = button.getAttribute('data-url');
        
        // Отправляем команду, соответствующую нажатой кнопке
        if (command) {
            sendWebhookData(command);
        }
        
        // Открываем ссылку (если она есть)
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
