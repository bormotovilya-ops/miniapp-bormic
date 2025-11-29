const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// 1. Устанавливаем Главную кнопку Telegram для закрытия
tg.MainButton.setText('Закрыть Mini App').show();
tg.MainButton.onClick(() => tg.close());

// 2. Слушаем все кнопки с работами
const workButtons = document.querySelectorAll('.work-btn');

workButtons.forEach(button => {
    button.onclick = (e) => {
        // Получаем команду из атрибута data-command
        const command = button.getAttribute('data-command');
        // Получаем URL из атрибута data-url
        const url = button.getAttribute('data-url');
        
        // Шаг 1: Отправляем команду в LeadTeh
        if (command) {
            tg.sendData(command);
            // Опционально: показываем, что команда отправлена
            tg.showAlert(`Команда отправлена: ${command}`); 
        }
        
        // Шаг 2: Открываем ссылку
        if (url) {
            // Используем openLink для открытия ссылки в браузере или Telegram
            tg.openLink(url); 
        } 
        
        // Шаг 3: Закрываем Mini App
        tg.close();
        
        e.preventDefault(); 
    };
});
