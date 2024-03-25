import {
	DEFAULT_ASSETS_FOLDER_NAME,
	DEFAULT_ASSETS_URL_PATH,
	DEFAULT_DIST_FOLDER_NAME,
	DEFAULT_ENTRY_FILE_NAME,
	DEFAULT_ENTRY_PATH,
	DEFAULT_EXTENSIONS,
	DEFAULT_LOCALES_FOLDER_NAME,
	DEFAULT_LOCALES_URL_PATH,
	DEFAULT_OUTPUT_FILE_NAME,
	DEFAULT_OUTPUT_PATH,
	DEFAULT_SRC_ALIAS_NAME,
	DEFAULT_SRC_PATH,
	DEFAULT_WATCH_PATH,
} from '../config/defaults';
import path from 'path';
import type {
	GincatWebpackConfig,
	Mode,
	ModuleOptions,
	OptimizationOptions,
} from '../types/GincatWebpack.types';
import type {
	EntryObject,
	ResolveOptions,
	WebpackPluginInstance,
} from 'webpack';
import type { Configuration as WebpackDevServerConfig } from 'webpack-dev-server';
import { merge } from 'lodash';
import { DefinePlugin } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import JsonMinimizerPlugin from 'json-minimizer-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

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
		entry?: EntryObject,
		defaultConfig?: boolean,
	): GincatWebpackConfig['entry'] {
		let entryObject: EntryObject = {};

		const defaultEntryObject: EntryObject = {
			[DEFAULT_OUTPUT_FILE_NAME]: path.resolve(
				this.root,
				DEFAULT_ENTRY_PATH,
				DEFAULT_ENTRY_FILE_NAME,
			),
		};

		if (entry) {
			if (defaultConfig) {
				entryObject = defaultEntryObject;
			}
			entryObject = {
				...entryObject,
				...entry,
			};
		} else {
			entryObject = defaultEntryObject;
		}

		return entryObject;
	}

	public getOutput(
		output?: GincatWebpackConfig['output'],
	): GincatWebpackConfig['output'] {
		return {
			path: path.resolve(this.root, DEFAULT_OUTPUT_PATH),
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
			extensions: DEFAULT_EXTENSIONS,
			alias: {
				[DEFAULT_SRC_ALIAS_NAME]: path.resolve(
					this.root,
					DEFAULT_SRC_PATH,
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
						from: path.resolve(this.root, DEFAULT_ASSETS_FOLDER_NAME),
						to: path.resolve(this.root, DEFAULT_DIST_FOLDER_NAME),
						noErrorOnMissing: true,
					},
					{
						from: path.resolve(this.root, DEFAULT_LOCALES_FOLDER_NAME),
						to: path.resolve(this.root, DEFAULT_DIST_FOLDER_NAME),
						noErrorOnMissing: true,
					},
				],
			}),
			new DefinePlugin({}),
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
					paths: [path.resolve(this.root, DEFAULT_WATCH_PATH)],
				},
			],
			static: [
				{
					directory: path.resolve(this.root, DEFAULT_ASSETS_FOLDER_NAME),
					publicPath: DEFAULT_ASSETS_URL_PATH,
				},
				{
					directory: path.resolve(this.root, DEFAULT_LOCALES_FOLDER_NAME),
					publicPath: DEFAULT_LOCALES_URL_PATH,
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
		module?: ModuleOptions,
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
					test: /\.tsx?$/,
					exclude: /node_modules/,
					use: [{ loader: 'ts-loader' }],
				},
			],
		};

		if (module) {
			if (defaultConfig) {
				moduleObject = defaultModuleObject;
			}
			merge(moduleObject, module);
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

		if (module) {
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
