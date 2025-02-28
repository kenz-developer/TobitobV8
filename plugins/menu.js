/**
 * 
 *  CREDIT BY KENZ CREATOR
 *   WHATSAPP : +6285934686607
 * 
 */

const { namabot } = require("../config.js");
const { versi } = require("../config.js");
const { ownernama } = require("../config.js");
const moment = require("moment-timezone");
const { performance } = require("perf_hooks");
const { owner } = require("../config.js")
const path = require("path")
const fs = require("fs");
const { menu } = require("../config.js")


let botStartTime = performance.now();

const dataFile = path.join(__dirname, "../database/user.json");


module.exports = {
    command: ["menu"],
    run: async ({ bot, msg }) => {
        const chatId = msg.chat.id;
        const userName = msg.from.username ? `@${msg.from.username}` : msg.from.first_name;
        const userId = msg.from.id;
        const nama = msg.from.username ? `${msg.from.username}` : "Orang Asing"
        
        const isOwner = owner.includes(userId);
        const status = isOwner ? "👑 Owner" : "👤 Biasa";
        const type = msg.chat.type === "private" ? "Pribadi" : "Grup";
        
        let tanggal = moment().tz("Asia/Jakarta").format("DD MMMM YYYY");
        let jam = moment().tz("Asia/Jakarta").format("HH:mm:ss");
        let runtime = formatRuntime(performance.now() - botStartTime);
        
        let users = JSON.parse(fs.readFileSync(dataFile));
        if (!users.some(user => user.id === userId)) {
            return bot.sendMessage(chatId, "*⚠️ Kamu belum terdaftar! Gunakan /daftar terlebih dahulu.*", { parse_mode: "Markdown" });
        }
        
        let caption = `Hai! Perkenalkan saya adalah *${namabot}*, Saya dibuat oleh *${ownernama}* untuk membantumu setiap hari sesuai kebutuhanmu

╭〔 *INFO BOT* 〕
︱👑 Owner : ${ownernama}
︱🤖 Bot Name : ${namabot}
︱⏰ Uptime Bot: ${runtime}
︱👤 Status User : ${status}
︱📌 Version Bot : ${versi}
╰〔 *KENZ CREATOR* 〕\n
╭〔 *INFO USER* 〕
︱👤 Name User : ${nama}
︱🆔 ID User : ${userId}
︱📌 Type Chat : ${type}
╰〔 *${nama}* 〕

✨ *Hi ${userName}*, berikut daftar perintah yang tersedia:

╭───〔 *Main Menu* 〕
┃  ◈ /broadcast
┃  ◈ /uptime
┃  ◈ /status
┃  ◈ /deposit
┃  ◈ /igstalk
┃  ◈ /ssweb
┃  ◈ /puisi
┃  ◈ /searchapk
╰────────────────❍
  
╭──〔 *AI Menu* 〕
┃  ◈ /gpt
┃  ◈ /ai
┃  ◈ /simi
┃  ◈ /geminiai
╰────────────────❍

╭──〔 *Tools Menu* 〕
┃  ◈ /tourl
┃  ◈ /tourl2
┃  ◈ /gitclone
┃  ◈ /viewsource
┃  ◈ /get
┃  ◈ /daftar
╰────────────────❍

╭──〔 *Music Menu* 〕
┃  ◈ /play
┃  ◈ /yts
┃  ◈ /ytmp4
┃  ◈ /ytmp3
╰────────────────❍

╭──〔 *Owner Menu* 〕
┃  ◈ /sc
┃  ◈ /addprem
╰────────────────❍

*© 2025 | Kenz Creator*
`;

        bot.sendPhoto(chatId, menu, { caption, parse_mode: "Markdown" });
    },
};

function formatRuntime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
    return `${hours} jam ${minutes} menit ${seconds} detik`;
}