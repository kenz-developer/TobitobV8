const fs = require("fs");
const path = require("path");

const dataFile = path.join(__dirname, "../database/teksjpm.json");

// Pastikan file database ada
if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, JSON.stringify([]));

// Fungsi membaca database
const loadData = () => JSON.parse(fs.readFileSync(dataFile));

// Fungsi menyimpan database
const saveData = (data) => fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

module.exports = [
    {
        command: ["addteksjpm"],
        run: async ({ bot, msg, match }) => {
            const chatId = msg.chat.id;
            const text = match[1];

            if (!text) return bot.sendMessage(chatId, "📌 *Gunakan:* /addteksjpm <teks>");

            let data = loadData();
            let nomor = data.length + 1; // Nomor urut otomatis

            data.push({ nomor, text });
            saveData(data);

            bot.sendMessage(chatId, `✅ Teks berhasil ditambahkan dengan nomor *${nomor}*!`);
        },
    },
    {
        command: ["getteksjpm"],
        run: async ({ bot, msg, match }) => {
            const chatId = msg.chat.id;
            const nomor = parseInt(match[1]);

            let data = loadData();
            if (data.length === 0) return bot.sendMessage(chatId, "❌ Belum ada teks yang ditambahkan!");

            if (isNaN(nomor) || nomor < 1 || nomor > data.length) {
                let daftar = data.map(d => `📌 *${d.nomor}.* ${d.text}`).join("\n");
                return bot.sendMessage(chatId, `📜 *Daftar Teks JPM:*\n${daftar}\n\n📌 *Gunakan:* /getteksjpm <nomor>`);
            }

            let teks = data.find(d => d.nomor === nomor);
            bot.sendMessage(chatId, `📌 *Teks JPM Nomor ${nomor}:*\n${teks.text}`);
        },
    },
];