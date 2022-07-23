import process from "process"
let { parseSeconds } = (await import("../lib/function.js?timestamp=" + Date.now())).default

let handler = async(m, { conn }) => {
  let uptime = process.uptime()
  m.reply("Bot ini sudah aktif selama " + parseSeconds(uptime))
}

handler.help = ["runtime", "uptime"]
handler.tags = ["info"]
handler.command = /^(run|up)time$/i
export default handler
