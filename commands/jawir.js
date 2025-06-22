const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "jawir",
  description: " seberapa jawir anda",
  usage: "!jawir",
  execute(message, args) {
    let jawirMeter;

    if (message.author.id.includes("691292862997987428")) {
      jawirMeter = 100;
    } else {
      jawirMeter = Math.floor(Math.random() * 101);
    }
    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle(`Jawir Meter`)
      .setDescription(
        `Anda **${message.author.username}** terverifikasi ${jawirMeter}% jawir.`
      )
      .setTimestamp();
    return message.channel.send({ embeds: [embed] });
  },
};
