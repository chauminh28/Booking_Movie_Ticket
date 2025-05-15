import flowbite from "flowbite/plugin";
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#f3f3f3",
      },
      backgroundImage: {
        logo: "url('/not-available.jpg')",
      },
    },
  },
  plugins: [flowbite],
};
