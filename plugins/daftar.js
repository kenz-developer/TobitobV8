const fs = require("fs");
const path = require("path");

const dataFile = path.join(__dirname, "../database/user.json");

// Pastikan file database ada
if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, JSON.stringify([]));

module.exports = {
    command: ["daftar"],
    run: async ({ bot, msg }) => {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const username = msg.from.username || "Tidak ada username";
        
        let users = JSON.parse(fs.readFileSync(dataFile));
        if (users.some(user => user.id === userId)) {
            return bot.sendMessage(chatId, "*✅ Kamu sudah terdaftar!*", { parse_mode: "Markdown" });
        }

        users.push({ id: userId, username });
        fs.writeFileSync(dataFile, JSON.stringify(users, null, 2));

        bot.sendMessage(chatId, "*✅ Pendaftaran berhasil! Sekarang kamu bisa menggunakan perintah /menu.*", { parse_mode: "Markdown" });
    },
};