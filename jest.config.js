module.exports = {
  verbose: true, // Indicates whether each individual test should be reported during the run; also, rquired for TTY output to always be displayed
	globals: {
		'ts-jest': {
			tsConfig: 'tsconfig.json'
		}
	},
	moduleFileExtensions: [
		'ts',
		'js'
	],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest'
	},
	testMatch: [
    "**/src/**/?(*.)+(spec|test).(js|ts)"
	],
	testEnvironment: 'node'
};
