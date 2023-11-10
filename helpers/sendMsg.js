const { Telegraf, Markup } = require('telegraf')
const dotenv = require('dotenv');
dotenv.config();
const bot = new Telegraf(process.env.BOT_TOKEN)

module.exports = {
    send: (data) => {

        const whatsapp = data => {
            let whatsapp_link = 'https://wa.me/?text=%E2%80%8C%E2%80%8C%E2%80%8E%E3%85%A4%E3%85%A4%F0%9F%93%9D%E3%85%A4NOTIFICATION%E3%85%A4%F0%9F%93%9D%20%0A%0A%0A%20%F0%9F%93%8D' + encodeURIComponent(data.subject) + '%20%0A%0A%20%E2%9C%8D%EF%B8%8F%20' + encodeURIComponent(data.message) + '%0A%0A%F0%9F%8C%90%20' + data.shortLink + '%20%0A%0A%20%F0%9F%94%97%20Join:%20https%3A%2F%2Ft.me/KTU_Notifier' + '%20%0A%0A%20%F0%9F%97%93%20' + data.date + '%20%E2%8F%B0' + encodeURIComponent(data.time)
            return whatsapp_link
        }

        let whatsapp_it = whatsapp(data)
        let btns = []

        try {
            for (const [key, value] of Object.entries(data.links)) {
                btns.push(Markup.button.url(`${key}`, `${value}`))
            }
        } catch {

        }

        const keyboard = Markup.inlineKeyboard([
            btns,
            [Markup.button.url('Whatsapp it', whatsapp_it), Markup.button.url('🔗 Join Channel', 'https://t.me/KTU_Notifier')]
        ])
        // console.log(`\n \n\n\nㅤㅤ📝ㅤ𝑵𝒐𝒕𝒊𝒇𝒊𝒄𝒂𝒕𝒊𝒐𝒏ㅤ📝 \n\n\n ❖ ${data.subject.toUpperCase()} \n\n ${data.message != null ? '📩 '+data.message:''} \n\n 🌐 ${data.shortLink} \n\n 📅 ${data.date} | ⏳ ${data.time}`)
        bot.telegram.sendMessage(process.env.CHAT_ID, `\n \n\n\nㅤㅤ📝ㅤ𝑵𝒐𝒕𝒊𝒇𝒊𝒄𝒂𝒕𝒊𝒐𝒏ㅤ📝 \n\n\n ❖ ${data.subject.toUpperCase()} \n\n ${data.message != null ? '📩 '+data.message:''} \n\n 🌐 ${data.shortLink} \n\n 📅 ${data.date} | ⏳ ${data.time}`, { reply_markup: keyboard.reply_markup, disable_web_page_preview: true, disable_notification: true }).catch(console.error)
    }
}
