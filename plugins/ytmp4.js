const ytdl = require("@distube/ytdl-core");
const fs = require("fs");
const path = require("path");

module.exports = {
    command: ["ytmp4"],
    run: async ({ bot, msg }) => {
        const chatId = msg.chat.id;
        const args = msg.text.split(" ");
        
        if (args.length < 2) return bot.sendMessage(chatId, "📌 *Gunakan:* /ytmp4 https://youtube", { parse_mode: "Markdown" });

        const url = args[1];
        if (!ytdl.validateURL(url)) return bot.sendMessage(chatId, "❌ Link tidak valid!", { parse_mode: "Markdown" });

        bot.sendMessage(chatId, "🔄 *Mengunduh video...*", { parse_mode: "Markdown" });

        try {
            const info = await ytdl.getInfo(url);
            const title = info.videoDetails.title.replace(/[^\w\s]/gi, "");
            const mp4File = path.join(__dirname, `../temp/${title}.mp4`);

            const stream = ytdl(url, { filter: "videoandaudio", quality: "highestvideo" });
            const writeStream = fs.createWriteStream(mp4File);

            stream.pipe(writeStream);
            writeStream.on("finish", () => {
                bot.sendMessage(chatId, `*🎬 Video Berhasil Diunduh!*`, { parse_mode: "Markdown" });
                bot.sendVideo(chatId, mp4File, { caption: `🎬 ${title}` });

                setTimeout(() => fs.unlinkSync(mp4File), 10000); // Hapus file setelah 10 detik
            });
        } catch (error) {
            console.error(error);
            bot.sendMessage(chatId, "❌ Gagal mengunduh video!");
        }
    },
};