module.exports = {
  name: "ping",
  description: "Membalas dengan Pong!",
  usage: "!ping",
  execute(message, args) {
    message.reply("Pong! 🏓");
  },
};
