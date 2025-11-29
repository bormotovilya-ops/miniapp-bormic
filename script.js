const tg = window.Telegram.WebApp;
const welcomeText = document.getElementById("welcomeText");

// 1. Инициализация TMA
tg.ready();
tg.expand();

// 2. Персонализация (необязательно, но приятно)
if (tg.initDataUnsafe.user) {
    const userName = tg.initDataUnsafe.user.first_name || "Там";
    welcomeText.textContent = `Привет, ${userName}! Здесь мои работы и контакты.`;
}

// 3. Устанавливаем Главную кнопку (MainButton) Telegram
tg.MainButton.setText('Закрыть Mini App')
tg.MainButton.show();

tg.MainButton.onClick(() => {
    tg.close();
});
