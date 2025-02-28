const axios = require("axios");

module.exports = {
    command: ["ai"],
    run: async ({ bot, msg }) => {
        const chatId = msg.chat.id;
        const args = msg.text.split(" ").slice(1).join(" ");
        const commandAi = "/ai";

        if (!args) return bot.sendMessage(chatId, `📌 *Gunakan:* ${commandAi} halo`, { parse_mode: "Markdown" });

        bot.sendMessage(chatId, "🤖 *Sedang memproses...*", { parse_mode: "Markdown" });

        try {
            const { data } = await axios.get(`https://kenz-api-psi.vercel.app/ai/gpt-kenz?text=${encodeURIComponent(args)}`);
            if (!data || !data.result) return bot.sendMessage(chatId, "❌ Tidak ada respon!");

            bot.sendMessage(chatId, `🧠 *AI:* ${data.result}`, { parse_mode: "Markdown" });
        } catch (error) {
            console.error(error);
            bot.sendMessage(chatId, "❌ Gagal mendapatkan respon AI!");
        }
    },
};