const axios = require("axios");
const { EmbedBuilder } = require("discord.js");
const translateCondition = require("../helpers/translateCondition");

module.exports = {
  name: "cuaca",
  description: "Menampilkan informasi cuaca untuk kota tertentu.",
  aliases: ["weather"],
  usage: "!cuaca <nama kota>",
  async execute(message, args) {
    if (!args.length) {
      return message.reply("Anda harus memberikan nama kota!");
    }

    const city = args.join(" ");
    const apiKey = process.env.WEATHERAPI_KEY;
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=id`;
    try {
      const response = await axios.get(apiUrl);
      const data = response.data;
      const location = data.location;
      const current = data.current;

      const city = location.name;
      const country = location.country;
      const temperature = current.temp_c;
      const feelsLike = current.feelslike_c;
      const conditionText = current.condition.text;
      const humidity = current.humidity;
      //   const windSpeed = data.wind.speed;
      //   const icon = data.weather[0].icon;
      //   const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      const weatherEmbed = new EmbedBuilder()
        .setColor("#0099ff") // Warna strip di sisi kiri embed
        .setTitle(`Cuaca di ${city}, ${country} 🏙️`)
        // .setDescription(
        //   `**${description.charAt(0).toUpperCase() + description.slice(1)}**`
        // )
        // .setThumbnail(iconUrl) // Icon cuaca kecil di pojok kanan atas
        .addFields(
          { name: "🌡️ Suhu", value: `${temperature}°C`, inline: true },
          {
            name: "🤔 Terasa Seperti",
            value: `${feelsLike}°C`,
            inline: true,
          },
          { name: "💧 Kelembapan", value: `${humidity}%`, inline: true },
          {
            name: "💨 Kondisi Cuaca",
            value: `${translateCondition(conditionText)}`,
            inline: true,
          }
        )
        .setTimestamp()
        .setFooter({ text: "Data disediakan oleh OpenWeatherMap" });
      message.channel.send({ embeds: [weatherEmbed] });
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === "404") {
        message.reply(
          `Kota "${cityName}" tidak dapat ditemukan. Mohon periksa kembali ejaannya.`
        );
      } else {
        message.reply("Terjadi kesalahan saat mengambil data cuaca.");
      }
    }
  },
};
