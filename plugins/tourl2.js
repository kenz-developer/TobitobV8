const FormData = require("form-data");
const fs = require("fs");
const axios = require("axios");

module.exports = {
    command: ["tourl2"],
    run: async ({ bot, msg }) => {
        const chatId = msg.chat.id;

        if (!msg.reply_to_message || !msg.reply_to_message.photo) {
            return bot.sendMessage(chatId, "📌 *Reply gambar atau file dengan command ini!*", { parse_mode: "Markdown" });
        }

        const file = await bot.downloadFile(msg.reply_to_message.document.file_id, "./temp/");
        const form = new FormData();
        form.append("file", fs.createReadStream(file));

        bot.sendMessage(chatId, "🔄 *Sedang mengunggah file...*", { parse_mode: "Markdown" });

        try {
            const { data } = await axios.post("https://cloudkuimages.xyz/upload", form, {
                headers: { ...form.getHeaders() }
            });

            if (data.status === "success") {
                bot.sendMessage(chatId, `✅ *File berhasil diunggah!*\n📎 *URL:* ${data.file_url}`, { parse_mode: "Markdown" });
            } else {
                bot.sendMessage(chatId, `❌ *Gagal upload!* ${data.message}`, { parse_mode: "Markdown" });
            }
        } catch (err) {
            console.error("❌ Error upload:", err);
            bot.sendMessage(chatId, "❌ *Terjadi kesalahan saat upload! Coba lagi nanti.*", { parse_mode: "Markdown" });
        }

        fs.unlinkSync(file);
    },
};