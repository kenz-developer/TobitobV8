/**
 * 
 * 
 * 
 * 
 */

const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");
const path = require("path");
const config = require("./config");
const chalk = require("chalk");

const bot = new TelegramBot(config.TOKENBOT, { polling: true });
//~~~~~~~~~~~< CONSOLE >~~~~~~~~~~~~//
bot.on("message", (msg) => {
    if (msg.text.startsWith("/")) {
        const userName = msg.from.first_name || "Unknown";
        const userId = msg.from.id;
        const chatType = msg.chat.type === "private" ? "Pribadi" : "Grup";
        const chatTime = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });

        console.log(chalk.bgBlue.white(`
📌 Command Diterima
⏰ Waktu : ${chatTime}
👤 Nama User : ${userName}
🆔 ID User : ${userId}
💬 Type Chat : ${chatType}
📣 Perintah : ${msg.text}
© 2025 | Kenz Creator\n`));
    }
});

const depositHandler = require("./plugins/deposit"); // Sesuaikan dengan path filenya
bot.on("message", async (msg) => depositHandler.handleMessage(bot, msg));

// Load plugins
const pluginsPath = path.join(__dirname, "plugins");
fs.readdirSync(pluginsPath).forEach((file) => {
    if (file.endsWith(".js")) {
        const plugin = require(path.join(pluginsPath, file));
        if (plugin.command && plugin.run) {
            bot.onText(new RegExp(`^/${plugin.command[0]}`), (msg, match) => {
                plugin.run({ bot, msg, match });
            });
        }
    }
});

console.log(chalk.bgCyan.black(`Welcome To Script Tobitob V8, Terima Kasih Telah Menggunakan Bot Kami Tunggu Update Selanjutnya\n\n`))

console.log(chalk.bgBlue("✅ Bot Telegram sudah aktif!"));
