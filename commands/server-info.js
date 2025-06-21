const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "server-info",
  description: "Menampilkan informasi detail tentang server ini.",
  aliases: ["infoserver", "serverinfo"],

  // Kita gunakan 'async' karena kita perlu menunggu data pemilik server (fetchOwner)
  async execute(message, args) {
    // Objek 'guild' adalah representasi dari server tempat pesan dikirim
    const guild = message.guild;

    // Menunggu (await) untuk mengambil data lengkap pemilik server
    try {
      const owner = await guild.fetchOwner();

      // Memfilter anggota untuk memisahkan manusia dan bot
      const members = guild.members.cache;
      const humanCount = members.filter((member) => !member.user.bot).size;
      const botCount = members.filter((member) => member.user.bot).size;

      // Membuat Embed untuk tampilan yang rapi
      const serverEmbed = new EmbedBuilder()
        .setColor("#5865F2") // Warna khas Discord
        .setTitle(`Informasi Server: ${guild.name}`)
        .setThumbnail(guild.iconURL({ dynamic: true })) // Mengambil ikon server
        .addFields(
          { name: "👑 Pemilik Server", value: owner.user.tag, inline: true },
          {
            name: "📆 Dibuat Pada",
            value: guild.createdAt.toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
            inline: true,
          },
          { name: "🆔 ID Server", value: guild.id, inline: false },
          {
            name: `👥 Anggota (${guild.memberCount})`,
            value: `**${humanCount}** Manusia | **${botCount}** Bot`,
            inline: true,
          },
          {
            name: `📡 Channels`,
            value: `${guild.channels.cache.size} Channel`,
            inline: true,
          },
          {
            name: `🎭 Roles`,
            value: `${guild.roles.cache.size} Role`,
            inline: true,
          }
        )
        .setTimestamp()
        .setFooter({
          text: `Diminta oleh ${message.author.tag}`,
          iconURL: message.author.displayAvatarURL({ dynamic: true }),
        });

      // Mengirim embed ke channel
      message.channel.send({ embeds: [serverEmbed] });
    } catch (error) {
      console.error("Gagal mengambil data server:", error);
      message.reply(
        "Terjadi kesalahan saat mencoba mendapatkan informasi server."
      );
    }
  },
};
