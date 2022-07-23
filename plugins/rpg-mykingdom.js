import PhoneNumber from "awesome-phonenumber" 
 import fs from "fs" 
  
 let handler = async (m, { conn, text, usedPrefix }) => { 
   let imgk = fs.readFileSync("./lib/kerajaan.jpg")
   let kingdom = global.db.data.users[m.sender].kingdom 
   if(!kingdom) return m.reply(`Kamu belum memiliki kerajaan!\n\nKetik : *${usedPrefix}kingdom NamaRaja|NamaKerajaan|(opsional)@aliansi*\nuntuk membuat kerajaan`) 
  
   let kerajaan = kingdom.kingdomName 
   let trops = kingdom.troops 
   let lvl = kingdom.lvl 
   let exp = kingdom.exp 
   let populasi = kingdom.population 
   let name = kingdom.namk 
   let aliance = kingdom.aliance 
   let koin = kingdom.koin 
  
   let benteng = kingdom.benteng || 0 
   let rs = kingdom.rumahsakit || 0 
   let kamp = kingdom.troopcamp || 0 
  
   let batu = kingdom.batu || 0 
   let kayu = kingdom.kayu || 0 
   let besi = kingdom.besi || 0 
   let emas = kingdom.emas || 0 
   let makanan = kingdom.makanan || 0 
  
   let lw = kingdom.lastwar || "-" 
   let lfs = kingdom.lastsda || "-" 
  
   if(typeof aliance[0] == "string") { 
     global.db.data.users[m.sender].kingdom.aliance = aliance.map(v => Object({ jid: v, pending: true })) 
     aliance = global.db.data.users[m.sender].kingdom.aliance 
   } 
  
   let caption = ` 
 _[ ❕ ] YOUR KINGDOM INFO_ 
  
 🏰 Nama Kerajaan : ${kerajaan} 
 👑 Raja : ${name} 
 👥 Populasi : ${populasi} 
 👮 Pasukan : ${trops} 
 🎋 Level : ${lvl} 
 🔮 Exp : ${exp}/1000 
  
 💹 Ekonomi SDA: 
   💰 Koin : ${koin} 
   🌳 Kayu : ${kayu} 
   ⛓️ Besi : ${besi} 
   🪨 Batu : ${batu} 
   🌮 Makanan : ${makanan} 
  
 🏗️ Fasilitas: 
   🏕️ Kamp pasukan : ${kamp != 0 ? "lvl " + kamp + (kamp == 3 ? " (max)" : "") : "tidak punya kamp pasukan"} 
   🏥 Rumah sakit : ${rs != 0 ? "lvl " + rs + (rs == 3 ? " (max)" : "") : "tidak punya rumah sakit"} 
  
 🏯 Benteng : ${benteng != 0 ? "lvl " + benteng + (benteng == 3 ? " (max)" : "") : "Tidak punya benteng"} 
  
 ⚔️ Last war : ${frmt(lw)} 
 🏮 Last find sda : ${frmt(lfs)} 
  
 🏳️ Teman Aliansi : 
 ${(aliance || []).filter(v => !v.pending).map(v => "@" + v.jid.split("@")[0]).join(" ") || "None"} 
  
 🏳️ Aliansi tertunda : 
 ${(aliance || []).filter(v => v.pending).map(v => "@" + v.jid.split("@")[0]).join(" ") || "None"} 
  
 ⚔️ To war typing: 
 ${usedPrefix}war @mention 
  
 🏰 Bangun Dan level up kerajaan 
 ${usedPrefix}build <type> 
  
 ♨️ Untuk Mengambil Sumber daya: 
 ${usedPrefix}getsda 
 `.trim() 
  
   conn.sendFile( m.chat, imgk, "kerajaa.jpg", caption, m, false, { 
     contextInfo: { 
       mentionedJid: conn.parseMention(caption) 
     } 
   }) 
 } 
  
 handler.help = ["mykingdom", "mykrjn", "kerajaanku"] 
 handler.tags = ["rpg"] 
 handler.command = /^(mykingdom|kerajaanku|mykrjn)$/i 
  
 export default handler 
  
  
 function frmt(n) { 
   let get = new Date(n) 
   return n == "-" ? "-" : `${get.getFullYear()}-${addZero([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12][get.getMonth()])}-${addZero(get.getDate())}, ${addZero(get.getHours())}:${addZero(get.getMinutes())}:${addZero(get.getSeconds())}` 
 } 
  
 function addZero(n) { 
   return (n*1) < 10 ? "0" + (n*1) : n 
 }
