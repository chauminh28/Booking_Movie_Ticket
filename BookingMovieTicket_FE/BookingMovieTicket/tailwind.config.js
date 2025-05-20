import flowbite from "flowbite/plugin";
export default {
  content: ["./**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#f3f3f3",
      },
      backgroundImage: {
        logo: "url('/not-available.jpg')",
        login: "url('./assets/public/images/Picture.png')",
      },
    },
  },
  plugins: [flowbite],
};
