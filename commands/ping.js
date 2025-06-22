const { EmbedBuilder } = require("discord.js");
const ping = require("ping");

module.exports = {
  name: "ping",
  description: "Mengecek latensi bot dan koneksi server ke internet.",
  category: "Utilitas",
  aliases: ["pong", "latency"],

  async execute(message, args) {
    const sentMsg = await message.reply("🏓 Pinging... Mohon tunggu...");

    try {
      const res = await ping.promise.probe("8.8.8.8", {
        timeout: 10,
      });

      // Ini adalah waktu antara pesan placeholder dikirim dan pesan asli dibuat
      const discordLatency =
        sentMsg.createdTimestamp - message.createdTimestamp;

      const pingEmbed = new EmbedBuilder()
        .setColor(res.alive ? "#00FF00" : "#FF0000") // Hijau jika hidup, merah jika mati
        .setTitle("Pong! 🏓")
        .addFields(
          {
            name: "⚡ Latensi API Discord",
            value: `${discordLatency} ms`,
            inline: true,
          },
          {
            name: "🌐 Latensi Server (ke 8.8.8.8)",
            value: res.alive
              ? `${Math.round(res.avg)} ms`
              : "Host tidak terjangkau",
            inline: true,
          }
        )
        .setTimestamp()
        .setFooter({ text: `Host: ${res.host}` });

      // 5. Edit pesan placeholder dengan hasil akhir
      await sentMsg.edit({ content: "Hasil Ping:", embeds: [pingEmbed] });
    } catch (error) {
      console.error("Error saat melakukan ping:", error);
      await sentMsg.edit(
        "Terjadi kesalahan saat mencoba melakukan ping ke server eksternal."
      );
    }
  },
};
