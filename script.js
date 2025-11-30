const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// Главная кнопка
tg.MainButton.setText('Закрыть Mini App').show();
tg.MainButton.onClick(() => tg.close());

// ---------------------------------------------------------
// 🎬 Обработка кнопки
// ---------------------------------------------------------
document.querySelectorAll('.work-btn').forEach(button => {
    button.onclick = (e) => {
        e.preventDefault();

        const url = button.getAttribute('data-url');
        
        if (url) {
            console.log("Попытка открыть прямую ссылку:", url);
            
            // 🔥 Mini App пытается открыть ссылку на t.me
            tg.openLink(url);
        } else {
            console.error("Атрибут data-url не найден.");
        }

        // Закрываем Mini App
        tg.close();
    };
});
