const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports = {
    command: ["viewsource"],
    run: async ({ bot, msg }) => {
        const chatId = msg.chat.id;
        const args = msg.text.split(" ");

        if (args.length < 2) return bot.sendMessage(chatId, "📌 *Gunakan: /viewsource https://example.com*", { parse_mode: "Markdown" });

        const url = args[1];

        bot.sendMessage(chatId, "🔄 *Mengambil source code...*", { parse_mode: "Markdown" });

        try {
            const { data } = await axios.get(url, { responseType: "text" });
            const filePath = path.join(__dirname, "../temp/source_code.html");

            fs.writeFileSync(filePath, data, "utf8");

            bot.sendDocument(chatId, filePath, { caption: "✅ *Berhasil mengambil source code!*" });

            setTimeout(() => fs.unlinkSync(filePath), 10000); // Hapus file setelah 10 detik
        } catch (error) {
            console.error(error);
            bot.sendMessage(chatId, "❌ *Gagal mengambil source code! Pastikan link valid.*", { parse_mode: "Markdown" });
        }
    },
};