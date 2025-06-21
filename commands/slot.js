const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "judi",
  description:
    "Gacha nomor acak untuk menguji keberuntunganmu!\nangka '7777' adalah jackpot!\nangka '9500' adalah super rare!\nangka '8000' adalah rare!",
  usage: "!judi",
  aliases: ["slot", "gacha"],

  execute(message, args) {
    // Menghasilkan angka acak dari 0 hingga 9999
    const angkaRandom = Math.floor(Math.random() * 10000);

    let hasilJudul = "";
    let hasilEmoji = "";
    let embedColor = "#FF0000"; // Warna default untuk kalah (merah)

    // Logika untuk menentukan tingkat kemenangan
    if (angkaRandom === 7777) {
      hasilJudul = "JACKPOT!!!";
      hasilEmoji = "💎💎💎";
      embedColor = "#FFD700"; // Emas
    } else if (angkaRandom > 9500) {
      hasilJudul = "WOW, SUPER RARE!";
      hasilEmoji = "🎉🎉";
      embedColor = "#FF69B4"; // Pink
    } else if (angkaRandom > 8000) {
      hasilJudul = "LUMAYAN, RARE!";
      hasilEmoji = "👍";
      embedColor = "#00BFFF"; // Biru
    } else {
      hasilJudul = "Anda Kurang Beruntung";
      hasilEmoji = "꽝"; // Emoji 'zonk' atau 'kalah'
    }

    // Membuat embed SATU KALI saja
    const embed = new EmbedBuilder()
      .setColor(embedColor) // Menggunakan warna dinamis sesuai hasil
      .setTitle("🎰 Mesin Slot Berputar... 🎰")
      .addFields(
        // Menambahkan field hasil yang dinamis
        { name: `${hasilJudul} ${hasilEmoji}`, value: "\u200B" }, // \u200B adalah spasi kosong
        // Mengubah angka menjadi string
        {
          name: "Angka yang Anda dapat:",
          value: `**${angkaRandom.toString()}**`,
          inline: false,
        }
      )
      .setTimestamp()
      .setFooter({
        text: `Diminta oleh ${message.author.tag}`,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      });

    // Mengirim embed yang sudah jadi
    return message.channel.send({ embeds: [embed] });
  },
};
