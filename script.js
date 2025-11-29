const tg = window.Telegram.WebApp;
tg.expand();

document.getElementById("startBtn").onclick = () => {
    tg.sendData("signup_clicked");
};
