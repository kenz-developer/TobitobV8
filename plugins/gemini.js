const axios = require("axios");

module.exports = {
    command: ["geminiai"],
    run: async ({ bot, msg }) => {
        const chatId = msg.chat.id;
        const args = msg.text.split(" ").slice(1).join(" ");
        const commandGpt = "/geminiai";

        if (!args) return bot.sendMessage(chatId, `📌 *Gunakan:* ${commandGpt} pertanyaan`, { parse_mode: "Markdown" });

        bot.sendMessage(chatId, "🤖 *Sedang memproses...*", { parse_mode: "Markdown" });

        try {
            const { data } = await axios.get(`https://kenz-api-psi.vercel.app/ai/hydromind?text=${encodeURIComponent(args)}&model=@google/gemini-1.5-pro`);
            if (!data || !data.result) return bot.sendMessage(chatId, "❌ Gagal mendapatkan respon!");

            bot.sendMessage(chatId, `💡 *Jawaban:*\n\n${data.result}`, { parse_mode: "Markdown" });
        } catch (error) {
            console.error(error);
            bot.sendMessage(chatId, "❌ Gagal mengambil data! Coba lagi nanti.");
        }
    },
};