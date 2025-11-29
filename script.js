const tg = window.Telegram.WebApp;
const welcomeTitle = document.getElementById("welcomeTitle");
const serviceBtn = document.getElementById("serviceBtn");

// 1. Увеличиваем размер Mini App
tg.ready();
tg.expand();

// 2. Персонализация приветствия
if (tg.initDataUnsafe.user) {
    const userName = tg.initDataUnsafe.user.first_name || "Там";
    welcomeTitle.textContent = `Привет, ${userName}!`;
} else {
    welcomeTitle.textContent = "Привет!";
}

// 3. Устанавливаем Главную кнопку (MainButton)
tg.MainButton.setText('Закрыть Mini App')
tg.MainButton.show();

// Обработчик нажатия Главной кнопки (закрытие Mini App)
tg.MainButton.onClick(() => {
    // Вы можете отправить какие-то данные перед закрытием, если нужно
    // tg.sendData("app_closed");
    tg.close();
});

// 4. Логика для кнопки "Обсудить ваш проект"
serviceBtn.onclick = () => {
    // Ваша логика: отправляем данные в бота (например, для запуска воронки LeadTeh)
    tg.sendData("discuss_project_clicked");
    
    // Опционально: можно показать уведомление
    tg.showAlert("Запрос отправлен! Бот свяжется с вами.");
    
    // Закрываем Mini App через 2 секунды
    setTimeout(() => {
        tg.close();
    }, 2000);
};
