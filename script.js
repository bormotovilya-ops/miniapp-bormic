const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// Главная кнопка
tg.MainButton.setText('Закрыть Mini App').show();
tg.MainButton.onClick(() => tg.close());

// ---------------------------------------------------------
// 🎬 Обработка всех кнопок
// ---------------------------------------------------------
document.querySelectorAll('.work-btn').forEach(button => {
    button.onclick = (e) => {
        e.preventDefault();

        const url = button.getAttribute('data-url');
        
        if (url) {
            // Используем прямой запуск сценария через tg.openLink(), как мы успешно протестировали
            tg.openLink(url);
        }

        // Закрываем Mini App сразу
        tg.close();
    };
});
