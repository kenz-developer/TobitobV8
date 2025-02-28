module.exports = {
    command: ["ssweb"],
    run: async ({ bot, msg }) => {
        const chatId = msg.chat.id;
        const args = msg.text.split(" ");

        if (args.length < 2) return bot.sendMessage(chatId, "📌 *Gunakan:* /ssweb <linkweb>", { parse_mode: "Markdown" });

        const url = encodeURIComponent(args[1]);
        const screenshotUrl = `https://image.thum.io/get/width/1280/noanimate/${url}`;

        bot.sendPhoto(chatId, screenshotUrl, { caption: "✅ *Berhasil mengambil screenshot!*" }).catch((err) => {
            console.error(err);
            bot.sendMessage(chatId, "❌ *Gagal mengambil screenshot! Pastikan link valid.*", { parse_mode: "Markdown" });
        });
    },
};