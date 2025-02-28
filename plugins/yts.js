const axios = require("axios");

module.exports = {
    command: ["yts"],
    run: async ({ bot, msg }) => {
        const chatId = msg.chat.id;
        const args = msg.text.split(" ").slice(1).join(" ");
        const commandyts = "/yts";

        if (!args) return bot.sendMessage(chatId, `📌 *Gunakan:* ${commandyts} mendua`, { parse_mode: "Markdown" });

        bot.sendMessage(chatId, "🔍 *Mencari video...*", { parse_mode: "Markdown" });

        try {
            const { data } = await axios.get(`https://kenz-api-psi.vercel.app/search/youtube?q=${encodeURIComponent(args)}`);
            if (!data || !data.result || data.result.length === 0) return bot.sendMessage(chatId, "❌ Tidak ditemukan!");

            let resultText = `🎥 *Hasil Pencarian YouTube:* \n\n`;
            data.result.slice(0, 5).forEach((item, index) => {
                let title = item.title;
                let url = item.link;
                resultText += `*${index + 1}.* [${title}](${url})\n`;
            });

            bot.sendMessage(chatId, resultText, { parse_mode: "Markdown" });
        } catch (error) {
            console.error(error);
            bot.sendMessage(chatId, "❌ Gagal mengambil data!");
        }
    },
};