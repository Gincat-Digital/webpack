import type { Config, GincatWebpackConfig } from '../types/GincatWebpack.types';
import { WebpackTools } from './WebpackTools';

export class GincatWebpack {
	private readonly root: string;
	// Default webpack configurations
	private readonly devConfig: GincatWebpackConfig;
	private readonly prodConfig: GincatWebpackConfig;

	public constructor(config: Config) {
		this.root = config.root;
		this.devConfig = new WebpackTools(this.root, 'development').config();
		this.prodConfig = new WebpackTools(this.root, 'production').config();
	}

	public get development(): GincatWebpackConfig {
		return this.devConfig;
	}
	
	public get production(): GincatWebpackConfig {
		return this.prodConfig;
	}
}
