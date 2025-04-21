/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",'./index.html'],
  theme: {
    extend: {
      fontFamily: {
        judul : "Playball",
        cinzel: ['"Cinzel Decorative"', 'cursive'], 
        inter : "Inter",
        ebGarmond: "EB+Garamond",
        times: ['"Times New Roman"', 'serif'],
        playfair: ['Playfair Display', 'serif'],
        volkhov: ["Volkhov", 'serif'],
        raleway: ['Raleway', 'serif'],
        nautigal: ['"The Nautigal"', 'cursive'],
        sanchez: ['"Sanchez"', 'serif'],
      },
      colors: {
        emas: "#BC9749",
        birdong: "#1A2D3B",
        abu: "#DDDDDD",
        emasTua: "#836B24",
        biruGelap: "#00001C",
        hijaugelap: "#132A13",
        cklt: "#CBB374"
      }
    },
  },
  plugins: [],
}

