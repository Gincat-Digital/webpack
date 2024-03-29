import { EntryObject } from 'webpack';
import type { Config, GincatWebpackConfig } from '../types/GincatWebpack.types';
import { WebpackTools } from './WebpackTools';

export class GincatWebpack {
	private readonly root: string;
	private readonly config?: Config;
	// Default webpack configurations
	private devConfig: GincatWebpackConfig;
	private readonly prodConfig: GincatWebpackConfig;

	public constructor(root: string, config?: Config) {
		this.root = root;
		this.config = config;

		this.setDevConfig();
		this.setProdConfig();
	}
	
	public get development(): GincatWebpackConfig {
		return this.devConfig;
	}
	
	public get production(): GincatWebpackConfig {
		return this.prodConfig;
	}

	private setDevConfig(): void {
		const wp = new WebpackTools(this.root, 'development');

		if (this.config) {
			this.devConfig = {
				mode: 'development',
				resolve: wp.getResolve(),
				module: wp.getModule(),
				plugins: wp.getPlugins(),
				optimization: wp.getOptimization(),
				entry: wp.getEntry(this.config.entries),
				output: wp.getOutput(this.config.output),
				devServer: this.config.devServer ? wp.getDevServer() : {},
			};
		} else {
			this.devConfig = wp.config();
		}
	}
	
	private setProdConfig(): void {
		const wp = new WebpackTools(this.root, 'production');

		if (this.config) {
			this.devConfig = {
				mode: 'production',
				resolve: wp.getResolve(),
				module: wp.getModule(),
				plugins: wp.getPlugins(),
				optimization: wp.getOptimization(),
				entry: wp.getEntry(this.config.entries),
				output: wp.getOutput(this.config.output),
				devServer: {},
			};
		} else {
			this.devConfig = wp.config();
		}
	}
}
