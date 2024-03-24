import type {
	EntryObject,
	RuleSetRule,
	Configuration as WebpackConfig,
	WebpackPluginInstance,
} from 'webpack';
import type {
	Static,
	WatchFiles,
	Configuration as WebpackDevServerConfig,
} from 'webpack-dev-server';

export type Mode = 'development' | 'production';

export type Config = {
	root: string;
};

export type ModuleOptions = {
	rules?: Array<RuleSetRule>;
} & WebpackConfig['module'];

export type OptimizationOptions = {
	minimizer?: Array<WebpackPluginInstance>;
} & WebpackConfig['optimization'];

export type GincatWebpackDevServerConfig = {
	static?: Array<Static>;
	watchFiles?: Array<WatchFiles>;
} & WebpackDevServerConfig;

export type GincatWebpackConfig = {
	mode: Mode;
	entry: EntryObject;
	devServer: WebpackDevServerConfig;
	plugins: Array<WebpackPluginInstance>;
	module: ModuleOptions;
	optimization: OptimizationOptions;
} & Required<Pick<WebpackConfig, 'output' | 'resolve'>> &
	WebpackConfig;
