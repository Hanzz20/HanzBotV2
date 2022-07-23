import fs from "fs"

let handler = async(m, { conn, args, usedPrefix, DevMode }) => {
  try {
    global.db.data.users[m.sender].lastbansos = global.db.data.users[m.sender].lastbansos || 0
    let Aku = Math.floor(Math.random() * 100)
    let Kamu = Math.floor(Math.random() * 75) // hehe Biar Susah Menang :v
    let kbansos = fs.readFileSync("./lib/kbansos.jpg")
    let mbansos = fs.readFileSync("./lib/mbansos.jpg")
    //let name = conn.getName[m.sender]
    let __timers = (new Date - global.db.data.users[m.sender].lastbansos)
    let _timers = (300000 - __timers)
    let timers = clockString(_timers)
    let user = global.db.data.users[m.sender]
    if(new Date - global.db.data.users[m.sender].lastbansos > 300000) {
      if(Aku > Kamu) {
        conn.sendMessage(m.chat, { image: kbansos, caption: "Kamu Tertangkap Setelah Kamu korupsi dana bansos🕴️💰,  Dan kamu harus membayar denda 3 Juta rupiah💵", quoted: m, thumbnail: Buffer.alloc(0) })
        user.money -= 3000000
        global.db.data.users[m.sender].lastbansos = new Date * 1
      } else if(Aku < Kamu) {
        user.money += 3000000
        conn.sendMessage(m.chat, { image: mbansos, caption: "Kamu berhasil  korupsi dana bansos🕴️💰,  Dan kamu mendapatkan 3 Juta rupiah💵", quoted: m, thumbnail: Buffer.alloc(0) })
        global.db.data.users[m.sender].lastbansos = new Date * 1
      } else {
        m.reply("Sorry Gan Lu g Berhasil Korupsi bansos Dan Tidak masuk penjara karna kamu *melarikan diri🏃*")
        global.db.data.users[m.sender].lastbansos = new Date * 1
      }
    } else m.reply(`Kamu sudah Melakukan Korupsi Bansos, dan kamu harus menunggu selama ${timers} agar bisa korupsi bansos kembali`)
  } catch(e) {
    throw e.stack || e
  }
}

handler.help = ["bansos"]
handler.tags = ["game"]
handler.command = /^(bansos)$/i

export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(":")
}
