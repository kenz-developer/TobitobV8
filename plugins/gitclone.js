const axios = require("axios");

module.exports = {
    command: ["gitclone"],
    run: async ({ bot, msg }) => {
        const chatId = msg.chat.id;
        const args = msg.text.split(" ").slice(1);
        const commandGit = "/gitclone";
        
        if (!args[0]) return bot.sendMessage(chatId, `📌 *Gunakan:* ${commandGit} https://github.com/username/repo`, { parse_mode: "Markdown" });

        const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
        if (!regex.test(args[0])) return bot.sendMessage(chatId, "❌ *URL GitHub tidak valid!*", { parse_mode: "Markdown" });

        let [_, user, repo] = args[0].match(regex) || [];
        repo = repo.replace(/.git$/, "");

        const apiUrl = `https://api.github.com/repos/${user}/${repo}`;
        const zipUrl = `https://api.github.com/repos/${user}/${repo}/zipball`;

        bot.sendMessage(chatId, "🔍 *Memeriksa repository...*", { parse_mode: "Markdown" });

        try {
            const { data: repoInfo } = await axios.get(apiUrl);
            if (repoInfo.private) return bot.sendMessage(chatId, "🔒 *Repository bersifat private!*");

            const zipRes = await axios.head(zipUrl);
            const size = zipRes.headers["content-length"];
            if (size && size > 50 * 1024 * 1024) return bot.sendMessage(chatId, "⚠️ *Ukuran repository terlalu besar!* (Maks 50MB)");

            const filename = `${repo}.zip`;
            const lastUpdated = new Date(repoInfo.updated_at).toLocaleString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });

            let repoText = `
🌐 *Repository Info*
👤 *Nama:* ${repoInfo.full_name}
📑 *Deskripsi:* ${repoInfo.description || "Tidak ada"}
⭐ *Stars:* ${repoInfo.stargazers_count}
🍴 *Forks:* ${repoInfo.forks_count}
🐞 *Issues:* ${repoInfo.open_issues_count}
🗓️ *Terakhir Diperbarui:* ${lastUpdated}
🔗 [Lihat Repository](https://github.com/${user}/${repo})
            `.trim();

            bot.sendMessage(chatId, repoText, { parse_mode: "Markdown" });
            bot.sendDocument(chatId, zipUrl, { caption: "✅ *Berikut adalah file ZIP repository!*", parse_mode: "Markdown" });

        } catch (error) {
            console.error(error);
            bot.sendMessage(chatId, "❌ *Gagal mengambil data! Pastikan URL valid atau coba lagi nanti.*", { parse_mode: "Markdown" });
        }
    },
};