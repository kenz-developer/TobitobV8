const axios = require("axios");
const fs = require("fs");

module.exports = {
    command: ["tourl"],
    run: async ({ bot, msg }) => {
        const chatId = msg.chat.id;

        if (!msg.reply_to_message || !msg.reply_to_message.photo) {
            return bot.sendMessage(chatId, "📌 *Reply gambar dengan command ini!*", { parse_mode: "Markdown" });
        }

        let fileId = msg.reply_to_message.photo.pop().file_id;
        let file = await bot.getFile(fileId);
        let filePath = `https://api.telegram.org/file/bot${bot.token}/${file.file_path}`;
        
        bot.sendMessage(chatId, "🔄 *Mengunggah gambar...*", { parse_mode: "Markdown" });

        try {
            let response = await axios({
                method: "post",
                url: "https://catbox.moe/user/api.php",
                headers: { "Content-Type": "multipart/form-data" },
                data: {
                    reqtype: "fileupload",
                    fileToUpload: (await axios.get(filePath, { responseType: "stream" })).data,
                },
            });

            let imageUrl = response.data;

            bot.sendMessage(chatId, `✅ *Berhasil!* \n🔗 *URL:* [Klik Disini](${imageUrl})`, { parse_mode: "Markdown" });
        } catch (error) {
            bot.sendMessage(chatId, "❌ *Gagal upload ke Catbox!*", { parse_mode: "Markdown" });
        }
    },
};