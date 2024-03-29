import path from 'path';
import type {
	EntryOptions,
	GincatWebpackConfig,
	Mode,
	ModuleOptions,
	OptimizationOptions,
	OutputOptions,
} from '../types/GincatWebpack.types';
import type {
	ResolveOptions,
	WebpackPluginInstance,
} from 'webpack';
import type { Configuration as WebpackDevServerConfig } from 'webpack-dev-server';
import { merge, transform } from 'lodash-es';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import JsonMinimizerPlugin from 'json-minimizer-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { Constants } from './Constants';

export class WebpackTools {
	private readonly root: string;
	private readonly mode: Mode;

	public constructor(root: string, mode: Mode) {
		this.root = root;
		this.mode = mode;
	}

	private isDev = () => this.mode === 'development';
	private isProd = () => this.mode === 'production';

	public getEntry(
		entry?: EntryOptions,
		defaultConfig?: boolean,
	): GincatWebpackConfig['entry'] {
		let entryObject: EntryOptions = {};

		const defaultEntryObject: EntryOptions = {
			[Constants.outputFileName]: path.resolve(
				this.root,
				Constants.entryPath,
				Constants.entryFileName,
			),
		};

		const getEntryFinal = (entries: EntryOptions) => {
			return transform(entries, (result, value, key) => {
				result[key] = typeof value === 'string'
					? path.resolve(this.root, value)
					: value.map((val) => path.resolve(this.root, val));
			}, {} as EntryOptions);
		}

		if (entry) {
			if (defaultConfig) {
				entryObject = defaultEntryObject;
			}
			entryObject = {
				...entryObject,
				...getEntryFinal(entry),
			};
		} else {
			entryObject = defaultEntryObject;
		}

		return entryObject;
	}

	public getOutput(
		output?: OutputOptions,
	): OutputOptions {
		return {
			path: path.resolve(this.root, Constants.outputPath),
			filename: '[name].bundle.js',
			...output,
		};
	}

	public getResolve(
		resolve?: GincatWebpackConfig['resolve'],
		defaultConfig?: boolean,
	): GincatWebpackConfig['resolve'] {
		let resolveObject: ResolveOptions = {};

		const defaultResolveObject: ResolveOptions = {
			cache: true,
			extensions: Constants.extensions,
			alias: {
				[Constants.srcAliasName]: path.resolve(
					this.root,
					Constants.srcPath,
				),
			},
		};

		if (resolve) {
			if (defaultConfig) {
				resolveObject = defaultResolveObject;
			}
			merge(resolveObject, resolve);
		} else {
			resolveObject = defaultResolveObject;
		}

		return resolveObject;
	}

	public getPlugins(
		plugins?: Array<WebpackPluginInstance>,
		defaultConfig?: boolean,
	): GincatWebpackConfig['plugins'] {
		let pluginsArray: Array<WebpackPluginInstance> = [];

		const defaultPluginsArray: Array<WebpackPluginInstance> = [
			new MiniCssExtractPlugin(),
			new CopyPlugin({
				patterns: [
					{
						from: path.resolve(this.root, Constants.assetsFolderName),
						to: path.resolve(this.root, Constants.distFolderName),
						noErrorOnMissing: true,
					},
					{
						from: path.resolve(this.root, Constants.localesFolderName),
						to: path.resolve(this.root, Constants.distFolderName),
						noErrorOnMissing: true,
					},
				],
			}),
			new webpack.DefinePlugin({}),
		];

		if (plugins) {
			if (defaultConfig) {
				pluginsArray = defaultPluginsArray;
			}
			pluginsArray.push(...plugins);
		} else {
			pluginsArray = defaultPluginsArray;
		}

		return pluginsArray;
	}

	public getDevServer(
		devServer?: WebpackDevServerConfig,
		defaultConfig?: boolean,
	): GincatWebpackConfig['devServer'] {
		let devServerObject: WebpackDevServerConfig = {};

		const defaultDevServerObject: WebpackDevServerConfig = {
			watchFiles: [
				{
					paths: [path.resolve(this.root, Constants.watchPath)],
				},
			],
			static: [
				{
					directory: path.resolve(this.root, Constants.assetsFolderName),
					publicPath: Constants.assetsUrlPath,
				},
				{
					directory: path.resolve(this.root, Constants.localesFolderName),
					publicPath: Constants.localesUrlPath,
				},
			],
			compress: true,
			hot: true,
			open: true,
			port: 9000,
		};

		if (devServer) {
			if (defaultConfig) {
				devServerObject = defaultDevServerObject;
			}
			merge(devServerObject, devServer);
		} else {
			devServerObject = defaultDevServerObject;
		}

		return this.isDev() ? devServerObject : {};
	}

	public getModule(
		modules?: ModuleOptions,
		defaultConfig?: boolean,
	): GincatWebpackConfig['module'] {
		let moduleObject: ModuleOptions = {};

		const defaultModuleObject: ModuleOptions = {
			rules: [
				{
					test: /\.json$/,
					exclude: /node_modules/,
					type: 'asset/resource',
				},
				{
					test: /\.(jpe?g|png|gif|svg)$/,
					exclude: /node_modules/,
					type: 'asset',
				},
				{
					test: /\.(c|s(c|a))ss$/,
					exclude: /node_modules/,
					use: [
						{ loader: 'style-loader' },
						{ loader: MiniCssExtractPlugin.loader },
						{ loader: 'css-loader' },
						{ loader: 'sass-loader' },
					],
				},
				{
					test: /\.(js|ts)x?$/,
					exclude: /node_modules/,
					use: [{ loader: 'babel-loader' }],
				},
			],
		};

		if (modules) {
			if (defaultConfig) {
				moduleObject = defaultModuleObject;
			}
			merge(moduleObject, modules);
		} else {
			moduleObject = defaultModuleObject;
		}

		return moduleObject;
	}

	public getOptimization(
		optimization?: OptimizationOptions,
		defaultConfig?: boolean,
	): GincatWebpackConfig['optimization'] {
		let optimizationObject: OptimizationOptions = {};

		const defaultOptimizationObject: OptimizationOptions = {
			minimize: this.isProd(),
			minimizer: [
				new JsonMinimizerPlugin(),
				new ImageMinimizerPlugin({
					minimizer: {
						implementation: ImageMinimizerPlugin.imageminMinify,
						options: {
							plugins: [
								[
									'gifsicle',
									{
										interlaced: true,
										optimizationLevel: 2,
									},
								],
								[
									'jpegtran',
									{
										progressive: true,
									},
								],
								[
									'optipng',
									{
										optimizationLevel: 5,
										errorRecovery: false,
									},
								],
								[
									'svgo',
									{
										plugins: [
											{
												name: 'preset-default',
												params: {
													overrides: {
														removeViewBox: false,
														addAttributesToSVGElement: {
															params: {
																attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
															},
														},
													},
												},
											},
										],
									},
								],
							],
						},
					},
				}),
			],
		};

		if (optimization) {
			if (defaultConfig) {
				optimizationObject = defaultOptimizationObject;
			}
			merge(optimizationObject, optimization);
		} else {
			optimizationObject = defaultOptimizationObject;
		}

		return optimizationObject;
	}

	public config(): GincatWebpackConfig {
		return {
			mode: this.mode,
			entry: this.getEntry(),
			output: this.getOutput(),
			resolve: this.getResolve(),
			module: this.getModule(),
			plugins: this.getPlugins(),
			optimization: this.getOptimization(),
			devServer: this.getDevServer(),
		};
	}
}
