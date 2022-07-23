let handler = async(m, { conn, text, participants }) => {
  let users = m.mentionedJid
  if(!users[0]) users = conn.parseMention(m.text)

  if(users.some(user => participants.find(v => v.id == user)?.admin == "superadmin")) return m.reply("One of the members you tagged is the owner of this group ;-;")
  if(!users[0]) return m.reply("tag / reply orang yang mau di kick!")
  for(let user of users) {
    if(user.endsWith("@s.whatsapp.net") && participants.some(v => v.id == user)) {
      const res = await conn.groupParticipantsUpdate(m.chat, [user], "remove")
      await delay(1 * 1000)
      m.reply(`Successfully kicked @${user.split("@")[0]}`, null, { mentions: [user] })
    }
  }
}
handler.help = ["kick", "-"].map(v => v + " @user")
handler.tags = ["group"]
handler.command = /^(kick|-)$/i

handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
