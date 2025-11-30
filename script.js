function sendCommandToLeadteh(command) {
    const userId = tg.initDataUnsafe?.user?.id;
    if (!userId) return;

    const url =
        `${WEBHOOK_BASE_URL}?contact_by=telegram_id` +
        `&search=${userId}` +
        `&variable_MiniAppCommandFinal=${encodeURIComponent(command)}`;

    const w = window.open(url, "_blank", "width=1,height=1,opacity=0");
    setTimeout(() => w?.close(), 150);
}
