const axios = require("axios");

module.exports = {
    command: ["gpt"],
    run: async ({ bot, msg }) => {
        const chatId = msg.chat.id;
        const args = msg.text.split(" ").slice(1).join(" ");
        const commandGpt = "/gpt";

        if (!args) return bot.sendMessage(chatId, `📌 *Gunakan:* ${commandGpt} <pertanyaan>`, { parse_mode: "Markdown" });

        bot.sendMessage(chatId, "🤖 *Sedang memproses jawaban...*", { parse_mode: "Markdown" });

        try {
            const { data } = await axios.get(`https://kenz-api-psi.vercel.app/ai/luminai?text=${encodeURIComponent(args)}`);
            if (!data || !data.result) return bot.sendMessage(chatId, "❌ Jawaban tidak ditemukan!");

            bot.sendMessage(chatId, `💬 *GPT:* ${data.result}`, { parse_mode: "Markdown" });
        } catch (error) {
            console.error(error);
            bot.sendMessage(chatId, "❌ Gagal mendapatkan jawaban! Coba lagi nanti.");
        }
    },
};