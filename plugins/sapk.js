const axios = require("axios");

module.exports = {
    command: ["searchapk"],
    run: async ({ bot, msg }) => {
        const chatId = msg.chat.id;
        const args = msg.text.split(" ").slice(1).join(" ");
        const commandApk = "/searchapk";

        if (!args) return bot.sendMessage(chatId, `📌 *Gunakan:* ${commandApk} nama_apk`, { parse_mode: "Markdown" });

        bot.sendMessage(chatId, "🔍 *Mencari aplikasi...*", { parse_mode: "Markdown" });

        try {
            const { data } = await axios.get(`https://kenz-api-psi.vercel.app/search/playstore?q=${encodeURIComponent(args)}`);
            if (!data || !data.result || data.result.length === 0) return bot.sendMessage(chatId, "❌ Aplikasi tidak ditemukan!");

            let resultText = `📱 *Hasil Pencarian Play Store:* \n\n`;
            data.result.forEach((item, index) => {
                resultText += `*${index + 1}.* [${item.nama}](${item.link})\n`;
            });

            bot.sendMessage(chatId, resultText, { parse_mode: "Markdown" });
        } catch (error) {
            console.error(error);
            bot.sendMessage(chatId, "❌ Gagal mengambil data! Coba lagi nanti.");
        }
    },
};