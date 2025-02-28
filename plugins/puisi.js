const axios = require("axios");

module.exports = {
    command: ["puisi"],
    run: async ({ bot, msg }) => {
        const chatId = msg.chat.id;

        bot.sendMessage(chatId, "📖 *Mengambil puisi acak...*", { parse_mode: "Markdown" });

        try {
            const { data } = await axios.get("https://kenz-api-psi.vercel.app/random/puisi");
            if (!data || !data.content) return bot.sendMessage(chatId, "❌ Puisi tidak ditemukan!");

            bot.sendMessage(chatId, `📜 *Puisi Random:*\n\n${data.content}`, { parse_mode: "Markdown" });
        } catch (error) {
            console.error(error);
            bot.sendMessage(chatId, "❌ Gagal mengambil puisi! Coba lagi nanti.");
        }
    },
};