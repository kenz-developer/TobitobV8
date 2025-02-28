const config = require("../config");

module.exports = {
    command: ["status"],
    run: async ({ bot, msg }) => {
        const chatId = msg.chat.id;
        const userId = msg.from.id;

        // Cek apakah user adalah owner
        const isOwner = config.owner.includes(userId);
        const status = isOwner ? "👑 Owner" : "👤 Biasa";

        bot.sendMessage(chatId, `📌 *Status Anda:* ${status}`, { parse_mode: "Markdown" });
    },
};