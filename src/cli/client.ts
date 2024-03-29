#! /usr/bin/env node
import webpack from 'webpack';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import path from 'path';

type Argvs = {
	config?: string;
} & yargs.Argv['argv'];

const argv: Argvs = yargs(hideBin(process.argv)).argv;

if (argv.config) {
	new Promise(async (resolve) => {
		const configPath = path.resolve(process.cwd(), argv.config!);
		const configURL = new URL(configPath).pathname.replace(/\\/g, '/');
		const config = await import(configURL);
		console.log(config);
		webpack(config, (err) => {
			console.log(err);
		});
		resolve(null);
	});
}
