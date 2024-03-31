#! /usr/bin/env node
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import path from 'path';
import { GincatWebpackConfig } from '../types/GincatWebpack.types';
import { omit } from 'lodash-es';

type Argvs = {
	config?: string;
} & yargs.Argv['argv'];

const argv: Argvs = yargs(hideBin(process.argv)).argv;

if (argv.config) {
	new Promise(async (resolve) => {
		const configPath = path.resolve(process.cwd(), argv.config!);
		const configURL = new URL(configPath).pathname.replace(/\\/g, '/');
		
		const config: GincatWebpackConfig = await import(configURL).then(
			(_config) => {
				return _config.default || _config.config;
			},
		);

		if (config.devServer) {
			const server = new WebpackDevServer(
				config.devServer,
				webpack({
					...omit(config, ['devServer']),
					stats: 'minimal',
				}),
			);
			server.start();
		} else {
			webpack(config, (error, stats) => {
				if (error) {
					throw new Error(error.message);
				} else {
					if (stats) {
						console.log(
							stats.toString({
								preset: 'minimal',
								colors: true,
							}),
						);
					}
				}
			});
		}

		resolve(null);
	});
}
