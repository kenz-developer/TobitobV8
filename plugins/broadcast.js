const config = require("../config");

module.exports = {
    command: ["broadcast"],
    owner: true,
    run: async ({ bot, msg, match }) => {
        const chatId = msg.chat.id;
        const userId = msg.from.id;

        // Cek apakah user adalah owner
        if (!config.owner.includes(userId)) {
            return bot.sendMessage(chatId, "🚫 *Kamu bukan owner!*", { parse_mode: "Markdown" });
        }

        const text = match.input.split(" ").slice(1).join(" ").trim();
        if (!text) return bot.sendMessage(chatId, "📢 *Contoh:* /broadcast hello world!", { parse_mode: "Markdown" });

        bot.sendMessage(chatId, "🔄 *Mengirim broadcast...*", { parse_mode: "Markdown" });

        try {
            let chats = await bot.getChat(chatId);
            let success = 0;
            let failed = 0;

            for (let chat of chats) {
                try {
                    await bot.sendMessage(chat.id, text, { parse_mode: "Markdown" });
                    success++;
                } catch {
                    failed++;
                }
            }

            bot.sendMessage(chatId, `✅ *Broadcast selesai!*\n\n📢 *Berhasil:* ${success}\n❌ *Gagal:* ${failed}`, { parse_mode: "Markdown" });
        } catch (error) {
            bot.sendMessage(chatId, "❌ *Gagal mengirim broadcast!*", { parse_mode: "Markdown" });
        }
    },
};