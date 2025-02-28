const fs = require("fs");
const path = require("path");

const premiumFile = path.join(__dirname, "../database/premium.json");

// Cek apakah file ada, jika tidak buat file kosong
if (!fs.existsSync(premiumFile)) {
    fs.writeFileSync(premiumFile, JSON.stringify([]));
}

// Fungsi untuk membaca data premium
const getPremiumUsers = () => {
    return JSON.parse(fs.readFileSync(premiumFile, "utf8"));
};

// Fungsi untuk menyimpan data premium
const savePremiumUsers = (data) => {
    fs.writeFileSync(premiumFile, JSON.stringify(data, null, 2));
};

// List owner (sesuai dengan global.owner di setting.js)
const { owner } = require("../config");

module.exports = {
    command: ["addprem", "delprem"],
    run: async ({ bot, msg }) => {
        const chatId = msg.chat.id;
        const senderId = msg.from.id;
        const args = msg.text.split(" ");

        // Cek apakah user adalah owner
        if (!owner.includes(senderId)) {
            return bot.sendMessage(chatId, "❌ *Kamu bukan owner!*", { parse_mode: "Markdown" });
        }

        if (args.length < 2) {
            return bot.sendMessage(chatId, "📌 *Gunakan:* _/addprem @userid atau /delprem @userid_", { parse_mode: "Markdown" });
        }

        const userId = args[1];

        let premiumUsers = getPremiumUsers();

        if (msg.text.startsWith("/addprem")) {
            if (premiumUsers.includes(userId)) {
                return bot.sendMessage(chatId, "✅ *User sudah menjadi premium!*", { parse_mode: "Markdown" });
            }

            premiumUsers.push(userId);
            savePremiumUsers(premiumUsers);
            bot.sendMessage(chatId, `✅ *User ${userId} berhasil ditambahkan ke premium!*`, { parse_mode: "Markdown" });
        } else if (msg.text.startsWith("/delprem")) {
            if (!premiumUsers.includes(userId)) {
                return bot.sendMessage(chatId, "❌ *User bukan premium!*", { parse_mode: "Markdown" });
            }

            premiumUsers = premiumUsers.filter((id) => id !== userId);
            savePremiumUsers(premiumUsers);
            bot.sendMessage(chatId, `✅ *User ${userId} berhasil dihapus dari premium!*`, { parse_mode: "Markdown" });
        }
    },
};