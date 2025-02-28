const axios = require("axios");
const fs = require("fs");

module.exports = {
    command: ["tourl3"],
    run: async ({ bot, msg }) => {
        const chatId = msg.chat.id;

        if (!msg.photo) return bot.sendMessage(chatId, "📌 *Kirim gambar dengan caption:* `/tourl3`", { parse_mode: "Markdown" });

        bot.sendMessage(chatId, "🔄 *Mengunggah gambar...*", { parse_mode: "Markdown" });

        try {
            const fileId = msg.photo[msg.photo.length - 1].file_id;
            const fileInfo = await bot.getFile(fileId);
            const fileUrl = `https://api.telegram.org/file/bot${process.env.TOKENBOT}/${fileInfo.file_path}`;

            // Download gambar
            const response = await axios({ url: fileUrl, responseType: "stream" });
            const filePath = `./temp_${Date.now()}.jpg`;

            const writer = fs.createWriteStream(filePath);
            response.data.pipe(writer);

            writer.on("finish", async () => {
                // Upload ke kenz.cloudx.biz.id
                const formData = new FormData();
                formData.append("file", fs.createReadStream(filePath));

                const uploadResponse = await axios.post("https://kenz.cloudx.biz.id/upload", formData, {
                    headers: { ...formData.getHeaders() }
                });

                fs.unlinkSync(filePath); // Hapus file setelah upload

                if (!uploadResponse.data.url) return bot.sendMessage(chatId, "❌ *Gagal mengunggah gambar!*", { parse_mode: "Markdown" });

                bot.sendMessage(chatId, `✅ *Berhasil!* \n🔗 URL: ${uploadResponse.data.url}`, { parse_mode: "Markdown" });
            });

        } catch (error) {
            console.error(error);
            bot.sendMessage(chatId, "❌ *Terjadi kesalahan, coba lagi nanti!*", { parse_mode: "Markdown" });
        }
    },
};