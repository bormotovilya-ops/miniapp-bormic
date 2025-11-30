const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// ---------------------------------------------------------
// 🔥 НОВАЯ ФУНКЦИЯ: Приветствие пользователя
// ---------------------------------------------------------
function setGreeting() {
    const userData = tg.initDataUnsafe.user;
    const greetingElement = document.getElementById('user-greeting');
    
    if (userData && greetingElement) {
        let name = userData.first_name || 'Гость';
        
        // Добавляем фамилию, если есть
        if (userData.last_name) {
            name += ' ' + userData.last_name;
        }
        
        greetingElement.innerText = `Привет, ${name}!`;
    } else if (greetingElement) {
        // Если данные пользователя недоступны (редко)
        greetingElement.innerText = `Привет!`;
    }
}

// Запускаем приветствие сразу после готовности Mini App
setGreeting();

// ---------------------------------------------------------
// 🎬 Обработка кнопок (Остается прежней)
// ---------------------------------------------------------
tg.MainButton.setText('Закрыть Mini App').show();
tg.MainButton.onClick(() => tg.close());

document.querySelectorAll('.work-btn').forEach(button => {
    button.onclick = (e) => {
        e.preventDefault();

        const url = button.getAttribute('data-url');
        
        if (url) {
            tg.openLink(url);
        }

      //  tg.close();
    };
});
