module.exports = {
  name: "halo",
  description: "Menyapa pengguna kembali",
  usage: "!halo",
  execute(message, args) {
    message.channel.send(`Halo juga, ${message.author.toString()}!`);
  },
};
