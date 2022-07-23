import baileys from "@adiwajshing/baileys"
let { areJidsSameUser, proto } = baileys

let handler = async(m, { conn, args }) => {
  let group = m.chat
  let groupMetadata = await conn.groupMetadata(group)
  if(!groupMetadata) return m.repl("groupMetadata is undefined :\\")
  if(!("participants" in groupMetadata)) return m.reply("participants is not defined :(")

  let HTB = new proto.HydratedTemplateButton({
    urlButton: new proto.HydratedURLButton({
      displayText: "Copy Link",
      url: "https://www.whatsapp.com/otp/copy/https://chat.whatsapp.com/" + await conn.groupInviteCode(group)
    }),
    index: 0
  })

  let HFRT = new proto.HydratedFourRowTemplate({
    hydratedButtons: [HTB],
    hydratedContentText: `Link Group: *${groupMetadata.subject}*`,
    hydratedFooterText: "Created by Vania"
  })

  let T = new proto.TemplateMessage({
    hydratedTemplate: HFRT,
    hydratedFourRowTemplate: HFRT
  })
  conn.relayMessage(m.chat, { templateMessage: T }, {})
}

handler.help = ["linkgroup", "linkgrup", "linkgc"]
handler.tags = ["group"]
handler.command = /^(link(gc|group|grup))$/i
handler.botAdmin = true

export default handler
