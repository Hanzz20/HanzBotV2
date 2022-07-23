let handler = async(m, { conn, usedPrefix, command, args, isROwner }) => { 
   if(!isROwner) return m.reply("Command ini masih uji coba") 
   if(!global.db.data.users[m.sender].kingdom) return m.reply(`Anda belum memiliki kerajaan!\nBuat kerajaan menggunakan perintah\n\n${usedPrefix}buatkerajaan nama_raja|nama_kerajaan|(opsional)@aliansi`) 
   let type = args[0] 
   let value1 = args[1] 
   let value2 = args[2] 
   let value3 = args[3] 
  
   let alliance = global.db.data.users[m.sender].kingdom.aliance 
   if(type == "aliansi" || type == "alliance") { 
     if(value1 == "accept" || value1 == "terima") { 
       let accept = conn.parseMention(args.filter(v => v.startsWith("@")).join(" "))[0] 
       if(!global.db.data.users[accept]?.kingdom) return 
       if(!global.db.data.users[accept].kingdom.aliance.includes(m.sender)) return m.reply("Dia tidak mengundangmu ke dalam aliansi!") 
       if(alliance.includes(accept)) return m.reply("Anda sudah beraliansi dengannya.") 
       alliance.push(accept) 
       if(alliance.includes(accept)) return m.reply("Sukses!") 
     } else if(value1 == "reject" || value1 == "tolak") { 
       let reject = conn.parseMention(args.filter(v => v.startsWith("@")).join(" "))[0] 
       return m.reply(reject) 
     } else if(value1 == "add" || value1 == "tambah") { 
       let add = conn.parseMention(args.filter(v => v.startsWith("@")).join(" "))[0] 
       return m.reply(add) 
     } else if(value1 == "remove" || value1 == "hapus") { 
       let remove = conn.parseMention(args.filter(v => v.startsWith("@")).join(" "))[0] 
       return m.reply(remove) 
     } else { 
       m.reply(` 
 ${value1 ? "Maaf, " + value1 + " tidak tersedia\n\n" : ""}Tersedia : 
   hapus 
   tambah 
   terima 
   tolak 
 `.trim()) 
       return false 
     } 
   } else { 
     m.reply(` 
 ${type ? "Maaf, " + type + " tidak tersedia\n\n" : ""}Tersedia : 
   aliansi 
   transfer | tf 
   Segera hadir 
 `.trim()) 
     return false 
   } 
 } 
  
 handler.help = ["kingdom", "kerajaan"] 
 handler.tags = ["rpg"] 
  
 handler.command = /^(k(erajaan|ingdom))$/i 
  
 export default handler
