const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "..", "/db/translations.json");

const readTranslations = () => {
  try {
    // Baca file secara sinkron
    const data = fs.readFileSync(dbPath, "utf8");
    // Ubah string JSON menjadi objek JavaScript
    return JSON.parse(data);
  } catch (error) {
    // Jika file tidak ada atau error, kembalikan objek kosong
    console.error("Gagal membaca file translations.json:", error);
    return {};
  }
};

module.exports = function translateCondition(condition) {
  const translations = readTranslations();
  return translations[condition.toLowerCase()] || condition;
};
