const { usage } = require("./cuaca");

module.exports = {
  name: "echo",
  description: "menampilkan kembali teks yang diberikan",
  usage: "!echo <teks>",
  execute(message, args) {
    // 1. Periksa apakah pengguna memberikan argumen
    if (!args.length) {
      return message.reply("Anda harus memberikan teks untuk saya ulangi!");
    }

    // 2. Gabungkan semua elemen di dalam array 'args' menjadi satu string,
    //    dipisahkan oleh spasi.
    const textToEcho = args.join(" ");

    // 3. Kirim kembali string yang sudah digabungkan
    if (textToEcho.includes("derril gay")) {
      message.reply(`Iya, memang betul ${textToEcho}`);
    } else {
      message.reply(`Mengembalikan pesan: ${textToEcho}`);
    }
    // message.reply(`Mengembalikan pesan: ${textToEcho}`);
  },
};
