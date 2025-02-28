const { Markup } = require("telegraf");

module.exports = {
    command: ["deposit"],
    run: async ({ bot, msg }) => {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const args = msg.text.split(" ")[1];
        const ownerId = "7299507029"; // Ganti dengan ID owner

        if (!args) return bot.sendMessage(chatId, "❌ Format salah!\nGunakan: `/deposit 10000|0859xxxxxxx|namalu`", { parse_mode: "Markdown" });

        const [amount, phone, nama] = args.split("|");
        if (!amount || !phone || !nama) return bot.sendMessage(chatId, "❌ Format salah!\nGunakan: `/deposit 10000|0859xxxxxxx|namalu`", { parse_mode: "Markdown" });

        bot.sendMessage(chatId, `📌 *Permintaan Deposit!*\n\n💰 Jumlah: Rp${amount}\n📞 No HP: ${phone}\nNama : ${nama}\n\n⏳ Tunggu konfirmasi dari admin...`, { parse_mode: "Markdown" });

        bot.sendMessage(ownerId, `💰 *Permintaan Deposit Baru!*\n👤 Dari: [${msg.from.first_name}](tg://user?id=${userId})\n📞 No HP: ${phone}\n💰 Jumlah: Rp${amount}\n\nKirim ✅ untuk menerima atau ❌ untuk menolak.`, { parse_mode: "Markdown" });

        // Simpan data deposit
        global.pendingDeposits = global.pendingDeposits || {};
        global.pendingDeposits[ownerId] = { userId, amount };
    },
};

// Event listener untuk menangkap emoji dari owner
module.exports.handleMessage = async (bot, msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const text = msg.text;

    if (!global.pendingDeposits || !global.pendingDeposits[userId]) return;

    const { userId: targetUserId, amount } = global.pendingDeposits[userId];

    if (text === "✅") {
        bot.sendMessage(chatId, "✅ Deposit berhasil diterima!");
        bot.sendMessage(targetUserId, `✅ *Deposit Rp${amount} telah diterima!*\nSilakan pilih produk yang tersedia.`, { parse_mode: "Markdown" });
        delete global.pendingDeposits[userId];
    } else if (text === "❌") {
        bot.sendMessage(chatId, "❌ Deposit ditolak.");
        bot.sendMessage(targetUserId, "❌ *Maaf, deposit Anda ditolak.*", { parse_mode: "Markdown" });
        delete global.pendingDeposits[userId];
    }
};