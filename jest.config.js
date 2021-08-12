module.exports = {
	setupFilesAfterEnv: ['./setupTests.js'],
	modulePaths: ['<rootDir>'],
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'identity-obj-proxy',
	},
};
