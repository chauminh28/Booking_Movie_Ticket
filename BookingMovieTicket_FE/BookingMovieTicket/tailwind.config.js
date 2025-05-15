import flowbite from "flowbite/plugin"

export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        login: "url('./assets/public/images/Picture.png')",
      }
    },
  },
  plugins: [flowbite],
};
