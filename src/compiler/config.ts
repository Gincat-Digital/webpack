import babel from '@babel/core';

babel.transformAsync('code', {
	presets: [
		'@babel/preset-env',
		'@babel/preset-react'
	],
});