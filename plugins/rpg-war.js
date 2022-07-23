let handler = async (m, { conn, text, usedPrefix }) => { 
   let nmu = conn.parseMention(text) 
   if(nmu.length == 0) return m.reply("Tag orang yang mau di attack!") 
   nmu = nmu[0] 
  
   let musuh = global.db.data.users[nmu] 
   let kingdom = global.db.data.users[m.sender] 
   if(!kingdom.kingdom) return m.reply("Kamu belum memiliki kerajaan!") 
   if(!musuh.kingdom) return m.reply("Dia belum memiliki kerajaan!") 
   /* Diri Sendiri */ 
   let kerajaan = global.db.data.users[m.sender].kingdom.kingdomName 
   let troops = global.db.data.users[m.sender].kingdom.troops 
   let lvl = global.db.data.users[m.sender].kingdom.lvl 
   let koin = global.db.data.users[m.sender].kingdom.koin 
   let batu = global.db.data.users[m.sender].kingdom.besi 
   let kayu = global.db.data.users[m.sender].kingdom.kayu 
   let besi = global.db.data.users[m.sender].kingdom.batu 
   let emas = global.db.data.users[m.sender].kingdom.emas 
   let makanan = global.db.data.users[m.sender].kingdom.makanan 
   let lw = global.db.data.users[m.sender].kingdom.lastwar || "-" 
   let al = global.db.data.users[m.sender].kingdom.aliance || "" 
   /* Musuh */ 
   let kerajaanM = global.db.data.users[nmu].kingdom.kingdomName 
   let troopsM = global.db.data.users[nmu].kingdom.troops 
   let lvlM = global.db.data.users[nmu].kingdom.lvl 
   let koinM = global.db.data.users[nmu].kingdom.koin 
   let batuM = global.db.data.users[nmu].kingdom.besi 
   let kayuM = global.db.data.users[nmu].kingdom.kayu 
   let besiM = global.db.data.users[nmu].kingdom.batu 
   let emasM = global.db.data.users[nmu].kingdom.emas 
   let makananM = global.db.data.users[nmu].kingdom.makanan 
   let alM = global.db.data.users[nmu].kingdom.aliance || "" 
  
   if(troops <= 0) return m.reply("Prajurit kamu tidak boleh 0 atau dibawah 0!") 
   if(troopsM <= 0) return m.reply("Prajurit musuh tidak boleh 0 atau dibawah 0!") 
  
   if(al.includes(nmu.split("@")[0])) return m.reply("Tidak dapat menyerang tim aliansi!") 
   if(alM.includes(m.sender.split("@")[0])) return m.reply("Tidak dapat menyerang tim aliansi!") 
  
   if(troops > troopsM) { 
     global.db.data.users[m.sender].kingdom.lastwar = new Date * 1 
     global.db.data.users[nmu].kingdom.troops -= troops 
     global.db.data.users[m.sender].kingdom.troops += troopsM 
     global.db.data.users[m.sender].kingdom.koin += (koinM - 30) 
     global.db.data.users[m.sender].kingdom.batu += (batuM - 30) 
     global.db.data.users[m.sender].kingdom.kayu += (kayuM - 30) 
     global.db.data.users[m.sender].kingdom.besi += (besiM - 30) 
     global.db.data.users[m.sender].kingdom.emas += (emasM - 30) 
     global.db.data.users[m.sender].kingdom.exp += 10 
     global.db.data.users[nmu].kingdom.koin -= (koinM - 30) 
     global.db.data.users[nmu].kingdom.batu -= (batuM - 30) 
     global.db.data.users[nmu].kingdom.kayu -= (kayuM - 30) 
     global.db.data.users[nmu].kingdom.besi -= (besiM - 30) 
     global.db.data.users[nmu].kingdom.emas -= (emasM - 30) 
     global.db.data.users[nmu].kingdom.exp -= 10 
  
     m.reply(`Kamu memenangkan pertarungan! 
 Kamu mendapatkan: 
 💂 ${troops + (troopsM)} 
 💰 ${koin + (koinM - 30)} 
 🪨 ${batu + (batuM - 30)} 
 🪵 ${kayu + (batuM - 30)} 
 ⛓️  ${besi + (besiM - 30)} 
 🪙 ${emas + (emasM - 30)} 
 🔮 10`) 
   } else if(troops < troopsM) { 
     global.db.data.users[m.sender].kingdom.lastwar = new Date * 1 
     global.db.data.users[nmu].kingdom.troops -= troops 
     global.db.data.users[m.sender].kingdom.troops = 0 
     global.db.data.users[m.sender].kingdom.koin -= (koinM - 30) 
     global.db.data.users[m.sender].kingdom.batu -= (batuM - 30) 
     global.db.data.users[m.sender].kingdom.kayu -= (kayuM - 30) 
     global.db.data.users[m.sender].kingdom.besi -= (besiM - 30) 
     global.db.data.users[m.sender].kingdom.emas -= (emasM - 30) 
     global.db.data.users[m.sender].kingdom.exp -= 10 
     global.db.data.users[nmu].kingdom.koin += (koinM - 30) 
     global.db.data.users[nmu].kingdom.batu += (batuM - 30) 
     global.db.data.users[nmu].kingdom.kayu += (kayuM - 30) 
     global.db.data.users[nmu].kingdom.besi += (besiM - 30) 
     global.db.data.users[nmu].kingdom.emas += (emasM - 30) 
     global.db.data.users[nmu].kingdom.exp += 10 
  
     m.reply(`Kamu kalah! 
 Kamu kehilangan: 
 💰 ${koin + (koinM - 30)} 
 🪨 ${batu + (batuM - 30)} 
 🪵 ${kayu + (kayuM - 30)} 
 ⛓️  ${besi + (besiM - 30)} 
 🪙 ${emas + (emasM - 30)} 
 🔮 10`) 
   } else { 
     m.reply("Seri") 
   } 
 } 
  
 handler.help = ["war <tag>"] 
 handler.tags = ["rpg"] 
 handler.command = /^(war)$/i 
  
 handler.owner = false 
 handler.register = true 
  
 export default handler
