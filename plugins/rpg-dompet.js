const moneyFormat = n => (n * 1).toLocaleString("id", { style: "currency", currency: "IDR" }) 
 const cek = b => b === true ? "✓" : b === false ? "×" : "[?]" 
  
 async function handler(m, { conn, isROwner }) { 
   let users = global.db.data.users[m.sender] 
   let { registered, money, limit, stamina, level, exp } = users 
   let isMods = mods.map(v => v[0]).includes(m.sender.split("@")[0]) || isROwner 
   let isPremium = prems.map(v => v[0]).includes(m.sender.split("@")[0]) || isROwner 
  
   let str = ` 
 ┌──「 DOMPET 」── 
 │ 
 ├ Nama : ${await conn.getName(m.sender)} 
 ├ Terdaftar : ${cek(registered)} 
 ├ Uang : ${moneyFormat(money)} 
 ├ Limit : ${limit} 
 ├ Stamina : ${stamina} 
 ├ Level : ${level} 
 ├ Exp : ${exp} 
 ├ Owner : ${cek(isROwner)} 
 ├ Moderator : ${cek(isMods)} 
 ├ Premium : ${cek(isPremium)} 
 │ 
 └──「 ${await conn.getName(conn.user.jid)} 」── 
 `.trim() 
   m.reply(str) 
 } 
  
 handler.help = ["dompet"] 
 handler.tags = ["rpg"] 
 handler.command = /^(dompet)$/i 
  
 export default handler
