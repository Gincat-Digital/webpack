/* eslint-disable max-lines */
import path from 'path';
import type {
	EntryOptions,
	GincatWebpackConfig,
	Mode,
	ModuleOptions,
	OptimizationOptions,
	OutputOptions,
} from '../types/GincatWebpack.types';
import webpack, {
	type ResolveOptions,
	type WebpackPluginInstance,
} from 'webpack';
import type { Configuration as WebpackDevServerConfig } from 'webpack-dev-server';
import { transform } from 'lodash-es';
import { Constants } from './Constants';
import { mergeConfig } from '../utils/mergeConfig';
/* eslint-disable @typescript-eslint/naming-convention */
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import JsonMinimizerPlugin from 'json-minimizer-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
/* eslint-enable @typescript-eslint/naming-convention */

export class WebpackTools {
	private readonly root: string;
	private readonly mode: Mode;

	public constructor(root: string, mode: Mode) {
		this.root = root;
		this.mode = mode;
	}

	private readonly isDev = (): boolean => this.mode === 'development';
	private readonly isProd = (): boolean => this.mode === 'production';

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

		const getEntryFinal = (entries: EntryOptions): EntryOptions => {
			return transform(
				entries,
				(result, value, key) => {
					result[key] =
						typeof value === 'string'
							? path.resolve(this.root, value)
							: value.map((val) => path.resolve(this.root, val));
				},
				{} as EntryOptions,
			);
		};

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

	public getOutput(output?: OutputOptions): OutputOptions {
		return {
			path: path.resolve(this.root, Constants.outputPath),
			filename: '[name].js',
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
				[Constants.srcAliasName]: path.resolve(this.root, Constants.srcPath),
			},
		};

		if (resolve) {
			if (defaultConfig) {
				resolveObject = defaultResolveObject;
			}
			resolveObject = mergeConfig(resolveObject, resolve);
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
			new HtmlWebpackPlugin({
				inject: 'body',
				publicPath: Constants.htmlPublicPath,
				template: path.resolve(
					this.root,
					Constants.htmlPath,
					Constants.htmlFileName,
				),
			}),
			new CopyPlugin({
				patterns: [
					{
						from: path.resolve(this.root, Constants.assetsPath),
						to: path.resolve(
							this.root,
							Constants.distFolderName,
							Constants.assetsFolderName,
						),
						noErrorOnMissing: true,
					},
					{
						from: path.resolve(this.root, Constants.localesPath),
						to: path.resolve(
							this.root,
							Constants.distFolderName,
							Constants.localesFolderName,
						),
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
					directory: path.resolve(this.root, Constants.assetsPath),
					publicPath: Constants.assetsUrlPath,
				},
				{
					directory: path.resolve(this.root, Constants.localesPath),
					publicPath: Constants.localesUrlPath,
				},
			],
			historyApiFallback: true,
			compress: true,
			hot: true,
			open: true,
			port: 9000,
		};

		if (devServer) {
			if (defaultConfig) {
				devServerObject = defaultDevServerObject;
			}
			devServerObject = mergeConfig(devServerObject, devServer);
		} else {
			devServerObject = defaultDevServerObject;
		}

		return this.isDev() ? devServerObject : undefined;
	}

	public getModule(
		modules?: ModuleOptions,
		defaultConfig?: boolean,
	): GincatWebpackConfig['module'] {
		let moduleObject: ModuleOptions = {};

		const defaultModuleObject: ModuleOptions = {
			rules: [
				{
					test: /\.json$/u,
					exclude: /node_modules/u,
					type: 'asset/resource',
				},
				{
					test: /\.(jpe?g|png|gif|svg)$/u,
					exclude: /node_modules/u,
					type: 'asset',
				},
				{
					test: /\.(c|s(c|a))ss$/u,
					exclude: /node_modules/u,
					use: [
						{ loader: 'style-loader' },
						{
							loader: MiniCssExtractPlugin.loader,
							options: {
								esModule: false,
							},
						},
						{
							loader: 'css-loader',
							options: {
								url: false,
							},
						},
						{ loader: 'sass-loader' },
					],
				},
				{
					test: /\.(woff(2)?|ttf|eot|svg)$/u,
					exclude: /node_modules/u,
					type: 'asset/resource',
					use: [
						{
							loader: 'file-loader',
							options: {
								emitFile: false,
							},
						},
					],
				},
				{
					test: /\.(js|ts)x?$/u,
					exclude: /node_modules/u,
					use: [
						{
							loader: 'babel-loader',
							options: {
								presets: [
									'@babel/preset-env',
									'@babel/preset-react',
									'@babel/preset-typescript',
								],
							},
						},
					],
				},
			],
		};

		if (modules) {
			if (defaultConfig) {
				moduleObject = defaultModuleObject;
			}
			moduleObject = mergeConfig(moduleObject, modules);
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
			optimizationObject = mergeConfig(optimizationObject, optimization);
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
