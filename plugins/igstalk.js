const axios = require("axios"); 
const cheerio = require("cheerio");

module.exports = { 
  command: ["igstalk"], 
  run: async ({ bot, msg, args }) => { 
  const chatId = msg.chat.id; 
  const username = msg.text.split(" ").slice(1).join(" ");

if (!username) return bot.sendMessage(chatId, "❌ Masukkan username Instagram!");

    try {
        const { data } = await axios.get(`https://greatfon.io/v/${username.toLowerCase()}`, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.9",
                "Cache-Control": "no-cache",
                "Pragma": "no-cache",
                "Connection": "keep-alive",
                "Upgrade-Insecure-Requests": "1",
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "none",
                "Sec-Fetch-User": "?1"
            }
        });
        
        const $ = cheerio.load(data);
        const avatar = $(".avatar img").attr("src");
        const fullname = $("h2.text-2xl").text().trim();
        const posts = $(".stat").eq(0).find(".stat-value").text().trim();
        const followers = $(".stat").eq(1).find(".stat-value").text().trim();
        const following = $(".stat").eq(2).find(".stat-value").text().trim();

        let caption = `📌 *Instagram Stalking*

👤 Username: ${username} 📝 Nama: ${fullname} 📷 Post: ${posts} 👥 Followers: ${followers} 👣 Following: ${following}`;

bot.sendPhoto(chatId, avatar, { caption, parse_mode: "Markdown" });
    } catch (error) {
        console.error("Error fetching data:", error.message);
        bot.sendMessage(chatId, "❌ Gagal mengambil data!");
    }
}

};

