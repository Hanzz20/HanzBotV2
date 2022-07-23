const linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i
export async function before(m, { isAdmin, isBotAdmin }) {
  if(m.isBaileys && m.fromMe) return !0
  if(!m.isGroup) return !1
  let chat = global.db.data.chats[m.chat]
  let bot = global.db.data.settings[this.user.jid] || {}
  const isGroupLink = linkRegex.exec(m.text)

  if(chat.antiLink && isGroupLink) {
    if(isAdmin) return m.reply("You are the admin, so I won't kick you :v")
    if(isBotAdmin) {
      const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
      if(m.text.includes(linkThisGroup)) return m.reply("You will not be kicked because it is the link of this group")
    }
    await conn.sendButton(m.chat, `*Group link detect!*${isBotAdmin ? "" : "\n\n_Bot not admin_"}`, author, ["off antilink", "/disable antilink"], m)
    if(isBotAdmin && bot.restrict) {
      await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
    } else if(!bot.restrict) return m.reply("Owner disable auto kick!")
  }
  return !0
}
