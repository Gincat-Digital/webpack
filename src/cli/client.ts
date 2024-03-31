#! /usr/bin/env node
import webpack from 'webpack';
// eslint-disable-next-line @typescript-eslint/naming-convention
import WebpackDevServer from 'webpack-dev-server';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import path from 'path';
import type { GincatWebpackConfig } from '../types/GincatWebpack.types';
import { omit } from 'lodash-es';

type Argvs = {
	config?: string;
} & yargs.Argv['argv'];

const argv: Argvs = yargs(hideBin(process.argv)).argv;

try {
	if (argv.config) {
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		(async (): Promise<void> => {
			const configPath = path.resolve(process.cwd(), argv.config!);
			const configURL = new URL(configPath).pathname.replace(/\\/gu, '/');

			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const config: GincatWebpackConfig = await import(configURL).then(
				// eslint-disable-next-line @typescript-eslint/naming-convention
				(_config) => {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
					return _config.default || _config.config;
				},
			);

			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (!config) {
				throw new Error(`No webpack configuration found at: ${configURL}`);
			}

			if (config.devServer) {
				const server = new WebpackDevServer(
					config.devServer,
					webpack({
						...omit(config, ['devServer']),
						stats: 'minimal',
					}),
				);
				// eslint-disable-next-line @typescript-eslint/no-floating-promises
				server.start();
			} else {
				webpack(config, (error, stats) => {
					if (error) {
						throw new Error(error.message);
					} else {
						if (stats) {
							// eslint-disable-next-line no-console
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
		})();
	} else {
		throw new Error(
			`No config path was found in client options, please provide '--config' flag with its respective config file ubication. For example: 'gcwp --config=path/to/webpack.config.js'`,
		);
	}
} catch (error) {
	// eslint-disable-next-line no-console
	console.log(error);
}
