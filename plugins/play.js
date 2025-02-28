const { exec } = require("child_process");
const fs = require("fs");

module.exports = {
    command: ["play"],
    run: async ({ bot, msg }) => {
        const chatId = msg.chat.id;
        const query = msg.text.split(" ").slice(1).join(" ");

        if (!query) {
            return bot.sendMessage(chatId, "⚠️ Masukkan judul lagu!\nContoh: /play mendua");
        }

        bot.sendMessage(chatId, "🔎 Sedang mencari lagu...");

        const filePath = `./temp/${query}.mp3`;

        exec(`yt-dlp -x --audio-format mp3 --audio-quality 192K -o "${filePath}" "ytsearch1:${query}"`, (err) => {
            if (err) {
                console.error(err);
                return bot.sendMessage(chatId, "❌ Gagal mengunduh audio!");
            }

            bot.sendMessage(chatId, "*🎵 Audio berhasil diunduh!*", { parse_mode: "Markdown" });
            bot.sendAudio(chatId, filePath, { caption: `✅ Selesai! Lagu: *${query}*`, parse_mode: "Markdown" });

            setTimeout(() => fs.unlinkSync(filePath), 10000); // Hapus file setelah 10 detik
        });
    },
};