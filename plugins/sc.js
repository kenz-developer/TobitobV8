const fs = require("fs");
const path = require("path");

module.exports = {
    command: ["sc"],
    run: async ({ bot, msg }) => {
        const chatId = msg.chat.id;
        const scriptFolder = path.join(__dirname, "../script");

        fs.readdir(scriptFolder, (err, files) => {
            if (err || files.length === 0) {
                return bot.sendMessage(chatId, "❌ Tidak ada file dalam folder script!", { parse_mode: "Markdown" });
            }

            files.forEach(file => {
                const filePath = path.join(scriptFolder, file);
                bot.sendDocument(chatId, filePath, { caption: `📂 *File:* ${file}`, parse_mode: "Markdown" });
            });
        });
    },
};