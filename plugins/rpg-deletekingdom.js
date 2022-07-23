import PhoneNumber from "awesome-phonenumber" 
  
 let handler = async (m, { conn, text, usedPrefix }) => { 
   let kingdom = global.db.data.users[m.sender].kingdom 
   if(!kingdom) return m.reply(`Kamu belum memiliki kerajaan!\n\nKetik *${usedPrefix}kingdom NamaRaja|NamaKerajaan|aliansi*\nuntuk membuat kerajaan`) 
   delete global.db.data.users[m.sender].kingdom 
   m.reply("Berhasil menghapus kerajaan!") 
 } 
  
 handler.help = ["deletekingdom", "hapuskerajaan"] 
 handler.tags = ["rpg"] 
 handler.command = /^(deletekingdom|hapuskerajaan)$/i 
  
 export default handler
