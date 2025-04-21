/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "merahMaroon" : "#641623",
        "merahMuda" : "#F0CDD3",
        "merahGelap" : "#541220",
        "kopi" : "#BDAE97",
        "merahAti" : "#511209",
        "kopi_2" : "#EEE2CE",
      },
      fontFamily: {
        garamond: ['"EB Garamond"', 'serif'],
        sacramento: ['Sacramento', 'cursive'],
        times: ['"Times New Roman"', 'serif'],
        nautigal: ['"The Nautigal"', 'cursive'],
        playfair: ['Playfair Display', 'serif'],
        raleway: ['Raleway', 'serif'],
        playball: 'Playball'
      },
    },
  },
  plugins: [],
}

