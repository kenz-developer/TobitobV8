const axios = require("axios");

module.exports = {
    command: ["simi"],
    run: async ({ bot, msg }) => {
        const chatId = msg.chat.id;
        const args = msg.text.split(" ").slice(1).join(" ");
        const commandSimi = "/simi";

        if (!args) return bot.sendMessage(chatId, `📌 *Gunakan:* ${commandSimi} Halo`, { parse_mode: "Markdown" });

        bot.sendMessage(chatId, "🔍 *Mendapatkan jawaban...*", { parse_mode: "Markdown" });

        try {
            const apiUrl = `https://www.ikyiizyy.my.id/api/ai/simsimi?text=${encodeURIComponent(args)}`;
            const { data } = await axios.get(apiUrl);

            if (!data.result) return bot.sendMessage(chatId, "❌ *Gagal mendapatkan jawaban!*", { parse_mode: "Markdown" });

            bot.sendMessage(chatId, `🤖 *Simi:* ${data.result}`, { parse_mode: "Markdown" });

        } catch (error) {
            console.error(error);
            bot.sendMessage(chatId, "❌ *Terjadi kesalahan, coba lagi nanti!*", { parse_mode: "Markdown" });
        }
    },
};