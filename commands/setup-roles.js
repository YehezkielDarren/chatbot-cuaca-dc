const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField,
} = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: "setup-roles",
  description: "Mengirim panel pemilihan role dengan tombol. (Admin Only)",
  category: "Moderasi",
  usage: "!setup-roles",

  async execute(message, args) {
    // 1. Cek apakah pengguna adalah admin
    if (
      !message.member.permissions.has(PermissionsBitField.Flags.Administrator)
    ) {
      return message.reply(
        "Maaf, hanya Administrator yang bisa menggunakan perintah ini."
      );
    }

    // 2. Baca konfigurasi dari file roles.json
    const rolesPath = path.join(__dirname, "..", "db", "roles.json");
    if (!fs.existsSync(rolesPath)) {
      return message.reply("File `roles.json` tidak ditemukan!");
    }
    const rolesConfig = JSON.parse(fs.readFileSync(rolesPath, "utf8"));

    if (!rolesConfig || rolesConfig.length === 0) {
      return message.reply("File `roles.json` kosong atau formatnya salah.");
    }

    // 3. Buat pesan embed yang menjelaskan cara kerja panel
    const embed = new EmbedBuilder()
      .setColor("#5865F2")
      .setTitle("✨ Pilih Role Sesuai Minat Anda ✨")
      .setDescription(
        "Klik tombol di bawah untuk mendapatkan role yang Anda inginkan.\n\nMengklik tombol lagi akan menghapus role tersebut dari Anda."
      )
      .setFooter({ text: `${message.guild.name} | Role System` });

    // 4. Buat tombol-tombol berdasarkan konfigurasi di roles.json
    const row = new ActionRowBuilder();
    rolesConfig.forEach((roleConfig) => {
      row.addComponents(
        new ButtonBuilder()
          // Custom ID adalah kunci untuk identifikasi tombol. Format: "prefix-data"
          .setCustomId(`role-${roleConfig.roleId}`)
          .setLabel(roleConfig.label)
          .setStyle(ButtonStyle[roleConfig.style] || ButtonStyle.Secondary) // Default ke abu-abu jika style tidak valid
          .setEmoji(roleConfig.emoji)
      );
    });

    // 5. Kirim pesan embed beserta tombol-tombolnya
    await message.channel.send({ embeds: [embed], components: [row] });

    // Hapus pesan perintah `!setup-roles` agar channel terlihat bersih
    await message.delete().catch(console.error);
  },
};
