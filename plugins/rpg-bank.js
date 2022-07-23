const moneyFormat = n => (n * 1).toLocaleString("id", { style: "currency", currency: "IDR" }) 
  
 async function handler(m, { conn, args, usedPrefix, command }) { 
   let type = (args[0] || "").toLowerCase() 
   let amount = Number(args[1]) 
   let tag = conn.parseMention(args[2])[0] 
  
   let err = { 
     "notAvailable": `${type ? "Tipe tidak tersedia: \"" + type + "\"\n\n" : ""}Daftar yang tersedia :\n01. lihat\n02. tarik\n03. kirim\n04. transfer\n\n\nContoh : ${usedPrefix}${command} kirim 1000`, 
     "notEnough": `Uang di ${type === "tarik" ? "bank" : "dompet"} tidak cukup :(`, 
     "notRegistered": [ 
       "Kamu tidak terdaftar dalam db bot :|", 
       "Dia tidak terdaftar dalam db bot :|" 
     ], 
     "who": "Siapa yang mau di transfer?", 
     "unknown1": "Jumlah bukan angka :|" 
   } 
   if(!type) return m.reply(err.notAvailable) 
  
   let users = global.db.data.users[m.sender] 
   if(!("bank" in users)) global.db.data.users[m.sender].bank = 0 
  
   if(type === "lihat") { 
     let txt = "Anda memiliki *" + moneyFormat(users.bank) + "* di bank" 
     m.reply(txt) 
   } else if(type === "tarik") { 
     if(isNaN(amount)) return m.reply(err.unknown1) 
     if(users.bank < amount) return m.reply(err.notEnough) 
     global.db.data.users[m.sender].money += amount 
     global.db.data.users[m.sender].bank -= amount 
     let txt = "Berhasil menarik *" + moneyFormat(amount) + "* dari bank" 
     m.reply(txt) 
   } else if(type === "kirim") { 
     if(isNaN(amount)) return m.reply(err.unknown1) 
     if(users.money < amount) return m.reply(err.notEnough) 
     global.db.data.users[m.sender].bank += amount 
     global.db.data.users[m.sender].money -= amount 
     let txt = "Berhasil mengirim *" + moneyFormat(amount) + "* ke bank" 
     m.reply(txt) 
   } else if(type === "transfer") { 
     if(isNaN(amount)) return m.reply(err.unknown1) 
     if(users.bank < amount) return m.reply(err.notEnough) 
     if(!tag) return m.reply(err.who) 
     if(!global.db.data.users[tag]) return m.reply(err.notRegistered[1]) 
     global.db.data.users[m.sender].bank -= amount 
     global.db.data.users[tag].bank += amount 
     let txt = "Berhasil mengirim *" + moneyFormat(amount) + "* ke bank @" + tag.split("@")[0] 
     m.reply(txt, m.chat, { mentions: conn.parseMention(txt) }) 
   } else return m.reply(err.notAvailable) 
 } 
  
 handler.help = ["bank"].map(v => v + " <tipe> (jumlah) (tag)") 
 handler.tags = ["rpg"] 
 handler.command = /^(bank)$/i 
  
 export default handler
