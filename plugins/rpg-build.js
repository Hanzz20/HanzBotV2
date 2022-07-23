let handler = async(m, { conn, args, usedPrefix, command, isOwner }) => { 
   //if(!isOwner) return m.reply("Perintah itu belum tersedia") 
   let kingdom = global.db.data.users[m.sender].kingdom 
   if(!kingdom) return m.reply("Kamu belum memiliki kerajaan!") 
  
   // cek 
   global.db.data.users[m.sender].kingdom.troopcamp = global.db.data.users[m.sender].kingdom.troopcamp || 0 
   global.db.data.users[m.sender].kingdom.rumahsakit = global.db.data.users[m.sender].kingdom.rumahsakit || 0 
   global.db.data.users[m.sender].kingdom.benteng = global.db.data.users[m.sender].kingdom.benteng || 0 
  
  
   if(args[0] == "kamp" || args[0] == "camp") { 
     let butuh = { kayu: 10 * global.db.data.users[m.sender].kingdom.troopcamp, batu: 15 * global.db.data.users[m.sender].kingdom.troopcamp, koin: 1500 } 
     if(global.db.data.users[m.sender].kingdom.troopcamp == 3) return m.reply("kamp sudah mencapai lvl maksimal") 
     if(global.db.data.users[m.sender].kingdom.kayu < butuh.kayu) return m.reply(`Kamu butuh ${String(butuh.kayu - global.db.data.users[m.sender].kingdom.kayu).padStart(2, "0")} kayu lagi!`) 
     if(global.db.data.users[m.sender].kingdom.batu < butuh.batu) return m.reply(`Kamu butuh ${String(butuh.batu - global.db.data.users[m.sender].kingdom.batu).padStart(2, "0")} batu lagi!`) 
     if(global.db.data.users[m.sender].kingdom.koin < butuh.koin) return m.reply(`Kamu butuh ${String(butuh.koin - global.db.data.users[m.sender].kingdom.koin).padStart(2, "0")} koin lagi!`) 
     global.db.data.users[m.sender].kingdom.kayu -= butuh.kayu 
     global.db.data.users[m.sender].kingdom.batu -= butuh.batu 
     global.db.data.users[m.sender].kingdom.koin -= butuh.koin 
     setTimeout(() => { 
       global.db.data.users[m.sender].kingdom.troopcamp += 1 
       m.reply("Selesai!") 
       global.db.data.users[m.sender].kingdom.exp += 10 
     }, (1000 * 3)) 
     m.reply("Silahkan tunggu...") 
   } else if(args[0] == "rs" || args[0] == "hospital") { 
     let butuh = { kayu: 15 * global.db.data.users[m.sender].kingdom.rumahsakit, batu: 20 * global.db.data.users[m.sender].kingdom.rumahsakit, koin: 1000 } 
     if(global.db.data.users[m.sender].kingdom.rumahsakit == 3) return m.reply("Rumah sakit sudah mencapai lvl maksimal") 
     if(global.db.data.users[m.sender].kingdom.kayu < butuh.kayu) return m.reply(`Kamu butuh ${String(butuh.kayu - global.db.data.users[m.sender].kingdom.kayu).padStart(2, "0")} kayu lagi!`) 
     if(global.db.data.users[m.sender].kingdom.batu < butuh.batu) return m.reply(`Kamu butuh ${String(butuh.batu - global.db.data.users[m.sender].kingdom.batu).padStart(2, "0")} batu lagi!`) 
     if(global.db.data.users[m.sender].kingdom.koin < butuh.koin) return m.reply(`Kamu butuh ${String(butuh.koin - global.db.data.users[m.sender].kingdom.koin).padStart(2, "0")} koin lagi!`) 
     global.db.data.users[m.sender].kingdom.kayu -= butuh.kayu 
     global.db.data.users[m.sender].kingdom.batu -= butuh.batu 
     global.db.data.users[m.sender].kingdom.koin -= butuh.koin 
     setTimeout(() => { 
       global.db.data.users[m.sender].kingdom.rumahsakit += 1 
       m.reply("Selesai!") 
       global.db.data.users[m.sender].kingdom.exp += 10 
     }, (1000 * 3)) 
     m.reply("Silahkan tunggu...") 
   } else if(args[0] == "benteng" || args[0] == "fortress") { 
     let butuh = { kayu: 20 * global.db.data.users[m.sender].kingdom.benteng, batu: 25 * global.db.data.users[m.sender].kingdom.benteng, koin: 2000 } 
     if(global.db.data.users[m.sender].kingdom. benteng== 3) return m.reply("Benteng sudah mencapai lvl maksimal") 
     if(global.db.data.users[m.sender].kingdom.kayu < butuh.kayu) return m.reply(`Kamu butuh ${String(butuh.kayu - global.db.data.users[m.sender].kingdom.kayu).padStart(2, "0")} kayu lagi!`) 
     if(global.db.data.users[m.sender].kingdom.batu < butuh.batu) return m.reply(`Kamu butuh ${String(butuh.batu - global.db.data.users[m.sender].kingdom.batu).padStart(2, "0")} batu lagi!`) 
     if(global.db.data.users[m.sender].kingdom.koin < butuh.koin) return m.reply(`Kamu butuh ${String(butuh.koin - global.db.data.users[m.sender].kingdom.koin).padStart(2, "0")} koin lagi!`) 
     global.db.data.users[m.sender].kingdom.kayu -= butuh.kayu 
     global.db.data.users[m.sender].kingdom.batu -= butuh.batu 
     global.db.data.users[m.sender].kingdom.koin -= butuh.koin 
     setTimeout(() => { 
       global.db.data.users[m.sender].kingdom.benteng += 1 
       m.reply("Selesai!") 
       global.db.data.users[m.sender].kingdom.exp += 10 
     }, (1000 * 3)) 
     m.reply("Silahkan tunggu...") 
   } else m.reply(`\n${args[0] ? "\"" + args[0] + "\" tidak tersedia!\n\n" : ""}Daftar bangunan yang tersedia :\n01. kamp || camp\n02. rs || hospital\n03. benteng || fortress\n`) 
 } 
  
 handler.help = ["build"] 
 handler.tags = ["rpg"] 
  
 handler.command = /^(build)$/i 
  
 export default handler
