const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	mode: 'jit',
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {
			animation: {
				flicker: 'flicker 15s ease-in infinite',
			},
			colors: {
				pink: {
					950: '#40152f',
				},
			},
			fontFamily: {
				sans: ['Proxima Nova', ...defaultTheme.fontFamily.sans],
			},
			keyframes: {
				flicker: {
					'0%': { filter: 'grayscale(0.8)' },
					'8%': { filter: 'grayscale(0.1)' },
					'10%': { filter: 'grayscale(0.7)' },
					'40%': { filter: 'grayscale(0.2)' },
					'42%': { filter: 'grayscale(0.7)' },
					'48%': { filter: 'grayscale(0.1)' },
					'52%': { filter: 'grayscale(0.6)' },
					'56%': { filter: 'grayscale(0)' },
					'59%': { filter: 'grayscale(0.9)' },
					'62%': { filter: 'grayscale(0)' },
					'65%': { filter: 'grayscale(0.1)' },
					'70%': { filter: 'grayscale(0.6)' },
					'77%': { filter: 'grayscale(0)' },
					'83%': { filter: 'grayscale(0.7)' },
					'86%': { filter: 'grayscale(0.9)' },
					'88%': { filter: 'grayscale(0)' },
					'96%': { filter: 'grayscale(0.6)' },
					'100%': { filter: 'grayscale(0.7)' },
				},
			},
			screens: {
				xs: '475px',
				...defaultTheme.screens,
				'3xl': '1600px',
			},
			transitionProperty: {
				spacing: 'margin, padding',
			},
		},
	},
	plugins: [],
};
