const fs = require("fs");
const path = require("path");
const { PermissionsBitField } = require("discord.js");
const { usage } = require("./help");

const dbPath = path.join(__dirname, "..", "/db/translations.json");

// Fungsi untuk membaca database (bisa disalin dari translator.js atau di-refactor ke modul sendiri)
const readTranslations = () => {
  try {
    const data = fs.readFileSync(dbPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
};

// Fungsi untuk menulis ke database
const writeTranslations = (data) => {
  try {
    // Tulis kembali objek ke file JSON dengan format yang rapi (spasi 2)
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Gagal menulis ke file translations.json:", error);
  }
};

module.exports = {
  name: "tambah-terjemahan",
  description:
    "Menambah atau memperbarui terjemahan kondisi cuaca. (Admin Only)",
  usage: "!tambah-terjemahan <teks_inggris> | <teks_indonesia>",
  execute(message, args) {
    // 1. Cek apakah pengguna adalah Administrator
    if (
      !message.member.permissions.has(PermissionsBitField.Flags.Administrator)
    ) {
      return message.reply(
        "Maaf, hanya Administrator yang bisa menggunakan perintah ini."
      );
    }

    // 2. Cek format argumen
    // Kita akan gunakan format: !tambah-terjemahan "Teks Inggris" | "Teks Indonesia"
    const content = args.join(" ");
    if (!content.includes("|")) {
      return message.reply(
        "Format salah! Gunakan: `!tambah-terjemahan Teks Inggris | Teks Indonesia`"
      );
    }

    const parts = content.split("|").map((part) => part.trim());
    const english = parts[0].toLowerCase();
    const indonesian = parts[1].toLowerCase();

    if (!english || !indonesian) {
      return message.reply(
        "Kedua teks (Inggris dan Indonesia) tidak boleh kosong!"
      );
    }

    // 3. Proses "Training"
    console.log(
      `Mencoba menambahkan terjemahan: '${english}' -> '${indonesian}'`
    );
    const translations = readTranslations(); // Baca database saat ini
    translations[english] = indonesian; // Tambah atau perbarui data
    writeTranslations(translations); // Tulis kembali ke file

    message.reply(
      `Terima kasih! Terjemahan untuk **"${english}"** telah diperbarui menjadi **"${indonesian}"**.`
    );
  },
};
