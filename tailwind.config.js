const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class", // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				pink: {
					950: "#40152f",
				},
			},
			fontFamily: {
				sans: ["Proxima Nova", ...defaultTheme.fontFamily.sans],
			},
			screens: {
				xs: "475px",
				...defaultTheme.screens,
				"3xl": "1600px",
			},
		},
	},
	variants: {
		extend: {
			borderColor: ["hover"],
			borderWidth: ["hover"],
			padding: ["active"],
			transitionProperty: ["hover"],
		},
	},
	plugins: [],
};
