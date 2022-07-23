let handler = async(m, { conn, usedPrefix, command, text }) => { 
   let fail = `Format salah\n\nContoh penggunaan :\n${usedPrefix}${command} nama_raja|nama_kerajaan|@aliansi\n${usedPrefix}${command} Restu|Majapahit|@aliansi` 
   let kingdom = global.db.data.users[m.sender] 
   let split = text.split("|") 
   let namk = split[0] 
   let kingdomName = split[1] 
   let aliance = conn.parseMention(split[2]) 
   aliance = aliance[0] ? aliance : [] 
  
   if(kingdom.kingdom) return m.reply(m.sender.startsWith("628") ? "Kamu sudah memiliki kerajaan" : "You already have a kingdom") 
   if(!namk || !kingdomName) return m.reply(fail) 
  
   global.db.data.users[m.sender].kingdom = { 
     namk, 
     kingdomName, 
     troops: 100, 
     population: 100, 
     lvl: 1, 
     aliance, 
     koin: 100000, 
     makanan: 1000, 
     exp: 0, 
     emas: 0, 
     kayu: 0, 
     batu: 0, 
     besi: 0 
   } 
  
   m.reply(` 
  
 🏰 Your kingdom created!! 
  
 🏰 Nama Kerajaan : ${kingdomName} 
 👑 Nama raja : ${namk} 
 👥 Populasi : ${global.db.data.users[m.sender].kingdom.population} 
 👮 Pasukan : ${global.db.data.users[m.sender].kingdom.troops} 
 🎋 Level : ${global.db.data.users[m.sender].kingdom.lvl} 
 🔮 Exp : ${global.db.data.users[m.sender].kingdom.exp} 
 💰 Koin : ${global.db.data.users[m.sender].kingdom.koin} *[ BERGUNA UNTUK UP LEVEL KERAJAAN ]* 
  
 🏳️ User yg diajak aliansi 
 ${aliance.map(v => "@" + v.split("@")[0]).join(" ") || "None"} 
  
 Cek kerajaaan milikmu! 
 ${usedPrefix}mykingdom 
 `, null, { 
     mention: conn.parseMention(text) 
   }) 
   if(Array.isArray(aliance)) { 
     aliance.forEach((v) => { 
       conn.sendMessage(v, `@${m.sender.split("@")[0]} mengundang Anda untuk menjadi aliansi di kerajaannya\nApakah Anda menerimanya?\n\nTolak => .kerajaan aliansi terima @${m.sender.split("@")[0]}\nTolak => .kerajaan aliansi tolak @${m.sender.split("@")[0]}`, { quoted: m }) 
     }) 
   } 
 } 
  
 handler.help = ["createkingdom", "buatkerajaan"].map(v => v + " (nama|namakerajaan|(opsional)@aliansi") 
 handler.tags = ["rpg"] 
  
 handler.command = /^(createkingdom|buatkerajaan)$/i 
  
 export default handler
