const { EmbedBuilder } = require("discord.js");
const { description, aliases } = require("./help");
const e = require("express");

module.exports = {
  name: "gay",
  description: "Mengenerate seberapa gay anda dari 0-100%",
  usage: "!gay <nama_anda>",
  aliases: ["lesbi"],
  execute(message, args) {
    if (args.length <= 0) {
      return message.reply(`Anda belum memasukkan nama anda!`);
    }
    const name = args.join(" ").toLowerCase();
    let gayMeter;
    if (
      name.includes("derril") ||
      name.includes("darryl") ||
      name.includes("ryl")
    ) {
      gayMeter = 100;
    } else if (name.includes("darren")) {
      gayMeter = 0;
    } else {
      gayMeter = Math.floor(Math.random() * 101);
    }
    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle(`Gay Meter`)
      .addFields({
        name: "Nama Anda",
        value: name,
        inline: true,
      })
      .addFields({
        name: "Gay Meter",
        value: `${gayMeter}%`,
        inline: true,
      })
      .setTimestamp()
      .setFooter({
        text: `Diminta oleh ${message.author.tag}`,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      });
    return message.channel.send({ embeds: [embed] });
  },
};
