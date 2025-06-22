const { EmbedBuilder } = require("discord.js");
// Mengimpor library tcp-ping yang baru
const tcpp = require("tcp-ping");

// Fungsi pembungkus (wrapper) untuk membuat tcpp.ping bisa digunakan dengan async/await
// Karena library ini menggunakan callback, bukan promise
function pingWithTcp(options) {
  return new Promise((resolve, reject) => {
    tcpp.ping(options, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
}

module.exports = {
  name: "ping",
  description:
    "Mengecek latensi bot dan koneksi server ke internet menggunakan TCP Ping.",
  category: "Utilitas",
  aliases: ["pong", "latency"],

  async execute(message, args) {
    const sentMsg = await message.reply("🏓 Pinging... Mohon tunggu...");

    try {
      // Opsi untuk tcp-ping. Kita akan ping port 53 (DNS) di server Google.
      const pingOptions = {
        address: "8.8.8.8",
        port: 53,
        timeout: 5000, // Tunggu hingga 5 detik
        attempts: 3, // Coba 3 kali
      };

      // Panggil fungsi ping kita yang sudah di-promise-kan
      const res = await pingWithTcp(pingOptions);

      const discordLatency =
        sentMsg.createdTimestamp - message.createdTimestamp;

      // Cek apakah hasil ping valid (memiliki nilai avg)
      const isAlive = !isNaN(res.avg);

      const pingEmbed = new EmbedBuilder()
        .setColor(isAlive ? "#00FF00" : "#FF0000")
        .setTitle("Pong! 🏓")
        .addFields(
          {
            name: "⚡ Latensi API Discord",
            value: `${discordLatency} ms`,
            inline: true,
          },
          {
            name: "🌐 Latensi Server (TCP ke 8.8.8.8:53)",
            value: isAlive
              ? `${Math.round(res.avg)} ms`
              : "Host tidak terjangkau",
            inline: true,
          }
        )
        .setTimestamp()
        .setFooter({ text: `Host: ${pingOptions.address}` });

      await sentMsg.edit({ content: "Hasil Ping:", embeds: [pingEmbed] });
    } catch (error) {
      console.error("Error saat melakukan TCP ping:", error);
      await sentMsg.edit(
        "Terjadi kesalahan saat mencoba melakukan ping ke server eksternal."
      );
    }
  },
};
