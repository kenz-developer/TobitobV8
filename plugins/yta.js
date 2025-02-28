const fetch = require("node-fetch");

module.exports = {
    command: ["ytmp3"],
    run: async ({ bot, msg }) => {
        const chatId = msg.chat.id;
        const args = msg.text.split(" ");

        if (args.length < 2) return bot.sendMessage(chatId, "📌 *Gunakan:* /ytmp3 <link_video>", { parse_mode: "Markdown" });

        const url = args[1];

        bot.sendMessage(chatId, "🔄 *Sedang memproses...*", { parse_mode: "Markdown" });

        try {
            const apiUrl = `https://kenzrestapi.kenzcode.biz.id/api/download/ytmp3?url=${encodeURIComponent(url)}`;
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (!data || !data.result || !data.result.url) {
                return bot.sendMessage(chatId, "❌ *Gagal mendapatkan audio! Pastikan link valid.*", { parse_mode: "Markdown" });
            }

            bot.sendAudio(chatId, data.result.url, { caption: `✅ *Berhasil Convert!*\n🎵 *Judul:* ${data.result.title}` });
        } catch (error) {
            console.error(error);
            bot.sendMessage(chatId, "❌ *Gagal mengunduh audio!*", { parse_mode: "Markdown" });
        }
    },
};