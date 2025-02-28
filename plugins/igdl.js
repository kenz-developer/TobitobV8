const axios = require("axios");

module.exports = {
    command: ["igdl"],
    run: async ({ bot, msg }) => {
        const chatId = msg.chat.id;
        const args = msg.text.split(" ").slice(1).join(" ");
        const commandIgdl = "/igdl";

        if (!args) return bot.sendMessage(chatId, `📌 *Gunakan:* ${commandIgdl} <link Instagram>`, { parse_mode: "Markdown" });

        bot.sendMessage(chatId, "📥 *Mengunduh media dari Instagram...*", { parse_mode: "Markdown" });

        try {
            const { data } = await axios.get(`https://kenz-api-psi.vercel.app/download/igdl?url=${encodeURIComponent(args)}`);
            if (!data || !data.result || !data.result.length) return bot.sendMessage(chatId, "❌ Media tidak ditemukan!");

            for (const media of data.result) {
                if (media.type === "image") {
                    await bot.sendPhoto(chatId, media.url, { caption: "✅ *Berhasil mengunduh gambar!*" });
                } else if (media.type === "video") {
                    await bot.sendVideo(chatId, media.url, { caption: "✅ *Berhasil mengunduh video!*" });
                }
            }
        } catch (error) {
            console.error(error);
            bot.sendMessage(chatId, "❌ Gagal mengunduh media! Pastikan link valid.");
        }
    },
};