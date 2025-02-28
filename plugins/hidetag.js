module.exports = {
    command: ["hidetag"],
    run: async ({ bot, msg, match }) => {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const text = match[1] || "🔔 Panggilan untuk semua anggota!";

        // Pastikan perintah hanya digunakan di grup
        if (msg.chat.type === "private") {
            return bot.sendMessage(chatId, "❌ Perintah ini hanya bisa digunakan di grup.");
        }

        // Cek apakah user admin
        let chatAdmins = await bot.getChatAdministrators(chatId);
        let isAdmin = chatAdmins.some(admin => admin.user.id === userId);

        if (!isAdmin) {
            return bot.sendMessage(chatId, "❌ Kamu harus menjadi admin untuk menggunakan perintah ini!");
        }

        try {
            // Ambil daftar semua anggota grup
            let members = await bot.getChatMemberCount(chatId);
            let memberIds = [];

            for (let i = 1; i <= members; i++) {
                try {
                    let member = await bot.getChatMember(chatId, i);
                    if (!member.user.is_bot) {
                        memberIds.push(member.user.id);
                    }
                } catch (e) {
                    continue;
                }
            }

            // Kirim pesan dengan mode "Disable Notification"
            for (let id of memberIds) {
                await bot.sendMessage(chatId, text, {
                    disable_notification: true,
                    reply_to_message_id: msg.message_id
                });
            }

            bot.sendMessage(chatId, "✅ Hidetag berhasil dikirim ke semua anggota!");

        } catch (error) {
            console.error(error);
            bot.sendMessage(chatId, "❌ Gagal melakukan hidetag!");
        }
    },
};