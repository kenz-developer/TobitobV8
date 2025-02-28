const ytdl = require("@distube/ytdl-core");
const fs = require("fs");
const path = require("path");

module.exports = {
    command: ["ytmp3"],
    run: async ({ bot, msg }) => {
        const chatId = msg.chat.id;
        const args = msg.text.split(" ");
        
        if (args.length < 2) return bot.sendMessage(chatId, "📌 *Gunakan:* /ytmp3 https://youtube", { parse_mode: "Markdown" });

        const url = args[1];
        if (!ytdl.validateURL(url)) return bot.sendMessage(chatId, "❌ Link tidak valid!", { parse_mode: "Markdown" });

        bot.sendMessage(chatId, "🔄 *Mengunduh audio...*", { parse_mode: "Markdown" });

        try {
            const info = await ytdl.getInfo(url);
            const title = info.videoDetails.title.replace(/[^\w\s]/gi, "");
            const mp3File = path.join(__dirname, `../temp/${title}.mp3`);

            const stream = ytdl(url, { filter: "audioonly", quality: "highestaudio" });
            const writeStream = fs.createWriteStream(mp3File);

            stream.pipe(writeStream);
            writeStream.on("finish", () => {
                bot.sendMessage(chatId, `*🎵 Audio Berhasil Diunduh!*`, { parse_mode: "Markdown" });
                bot.sendAudio(chatId, mp3File, { title });

                setTimeout(() => fs.unlinkSync(mp3File), 5000); // Hapus file setelah 5 detik
            });
        } catch (error) {
            console.error(error);
            bot.sendMessage(chatId, "❌ Gagal mengunduh audio!");
        }
    },
};