const moment = require("moment-timezone");
const { performance } = require("perf_hooks");

let botStartTime = performance.now();

module.exports = {
    command: ["uptime", "waktu"],
    run: async ({ bot, msg }) => {
        let chatId = msg.chat.id;

        let tanggal = moment().tz("Asia/Jakarta").format("DD MMMM YYYY");
        let jam = moment().tz("Asia/Jakarta").format("HH:mm:ss");
        let runtime = formatRuntime(performance.now() - botStartTime);

        let text = `📅 *Tanggal:* ${tanggal}\n🕒 *Jam:* ${jam}\n⏳ *Uptime Bot:* ${runtime}`;

        bot.sendMessage(chatId, text, { parse_mode: "Markdown" });
    },
};

function formatRuntime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
    return `${hours} jam ${minutes} menit ${seconds} detik`;
}