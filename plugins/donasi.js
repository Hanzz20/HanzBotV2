let handler = async (m, { conn, command, usedPrefix }) => {
  conn.sendHydrated(m.chat, `
=${conn.getName(m.sender)} Want Support Bot?

*PAYMENT ↓*
_*Pulsa/Pulse(Indosat Ooredoo / Im3):*_ ${pulsa}
_*Dana:*_ ${dana}
_*Gopay:*_ ${gopay}
_*Saweria:*_ ${saweria}

Setelah melakukan donasi kirim bukti pembayaran ke owner
After making a donation, send proof of payment to the owner
`, author, "https://github.com/Rizxyu/games-wabot-md/raw/private/plugins/donasi.js", "webs", "Website", null, null, [["Owner", ".owner"]], m)
}
handler.help = ["donasi"]
handler.tags = ["info"]
handler.command = /^dona(te|si)$/i

export default handler
