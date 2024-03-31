import type { ConstantVars } from '../types/Constants.types';

export class Constants {
	/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/prefer-readonly */

	// Folder names
	private static SRC_FOLDER_NAME: ConstantVars['SRC_FOLDER_NAME'] = 'src';
	private static ASSETS_FOLDER_NAME: ConstantVars['ASSETS_FOLDER_NAME'] =
		'assets';
	private static LOCALES_FOLDER_NAME: ConstantVars['LOCALES_FOLDER_NAME'] =
		'locales';
	private static ENTRY_FOLDER_NAME: ConstantVars['ENTRY_FOLDER_NAME'] = 'app';
	private static DIST_FOLDER_NAME: ConstantVars['DIST_FOLDER_NAME'] = 'dist';
	private static OUTPUT_FOLDER_NAME: ConstantVars['OUTPUT_FOLDER_NAME'] =
		'bundles';
	private static HTML_FOLDER_NAME: ConstantVars['HTML_FOLDER_NAME'] = 'html';
	private static FONTS_FOLDER_NAME: ConstantVars['FONTS_FOLDER_NAME'] = 'fonts';

	// File names
	private static ENTRY_FILE_NAME: ConstantVars['ENTRY_FILE_NAME'] = 'App.tsx';
	private static OUTPUT_FILE_NAME: ConstantVars['OUTPUT_FILE_NAME'] = 'app';
	private static HTML_FILE_NAME: ConstantVars['HTML_FILE_NAME'] = 'index.html';

	// Paths
	private static ENTRY_PATH: ConstantVars['ENTRY_PATH'] = `${this.SRC_FOLDER_NAME}/${this.ENTRY_FOLDER_NAME}`;
	private static OUTPUT_PATH: ConstantVars['OUTPUT_PATH'] = `${this.DIST_FOLDER_NAME}/${this.OUTPUT_FOLDER_NAME}`;
	private static SRC_PATH: ConstantVars['SRC_PATH'] = `${this.SRC_FOLDER_NAME}`;
	private static ASSETS_PATH: ConstantVars['ASSETS_PATH'] = `${this.SRC_FOLDER_NAME}/${this.ASSETS_FOLDER_NAME}`;
	private static LOCALES_PATH: ConstantVars['LOCALES_PATH'] = `${this.SRC_FOLDER_NAME}/${this.LOCALES_FOLDER_NAME}`;
	private static HTML_PATH: ConstantVars['WATCH_PATH'] = `${this.SRC_FOLDER_NAME}/${this.HTML_FOLDER_NAME}`;
	private static WATCH_PATH: ConstantVars['WATCH_PATH'] = `${this.SRC_FOLDER_NAME}/**/*`;

	// Extensions
	private static EXTENSIONS: ConstantVars['EXTENSIONS'] = [
		'.tsx',
		'.ts',
		'.jsx',
		'.js',
		'.scss',
		'.sass',
		'.css',
		'.json',
	];

	// Aliases names
	private static SRC_ALIAS_NAME: ConstantVars['SRC_ALIAS_NAME'] = '@';

	// URL paths
	private static ASSETS_URL_PATH: ConstantVars['ASSETS_URL_PATH'] = '/assets';
	private static LOCALES_URL_PATH: ConstantVars['LOCALES_URL_PATH'] = '/locales';

	/* eslint-enable @typescript-eslint/naming-convention, @typescript-eslint/prefer-readonly */

	public static get srcFolderName(): string {
		return this.SRC_FOLDER_NAME;
	}

	public static get assetsFolderName(): string {
		return this.ASSETS_FOLDER_NAME;
	}

	public static get localesFolderName(): string {
		return this.LOCALES_FOLDER_NAME;
	}

	public static get entryFolderName(): string {
		return this.ENTRY_FOLDER_NAME;
	}

	public static get distFolderName(): string {
		return this.DIST_FOLDER_NAME;
	}

	public static get outputFolderName(): string {
		return this.OUTPUT_FOLDER_NAME;
	}

	public static get htmlFolderName(): string {
		return this.HTML_FOLDER_NAME;
	}

	public static get fontsFolderName(): string {
		return this.FONTS_FOLDER_NAME;
	}

	public static get entryFileName(): string {
		return this.ENTRY_FILE_NAME;
	}

	public static get outputFileName(): string {
		return this.OUTPUT_FILE_NAME;
	}

	public static get htmlFileName(): string {
		return this.HTML_FILE_NAME;
	}

	public static get entryPath(): string {
		return this.ENTRY_PATH;
	}

	public static get outputPath(): string {
		return this.OUTPUT_PATH;
	}

	public static get srcPath(): string {
		return this.SRC_PATH;
	}

	public static get assetsPath(): string {
		return this.ASSETS_PATH;
	}

	public static get localesPath(): string {
		return this.LOCALES_PATH;
	}

	public static get htmlPath(): string {
		return this.HTML_PATH;
	}

	public static get watchPath(): string {
		return this.WATCH_PATH;
	}

	public static get extensions(): Array<string> {
		return this.EXTENSIONS;
	}

	public static get srcAliasName(): string {
		return this.SRC_ALIAS_NAME;
	}

	public static get assetsUrlPath(): string {
		return this.ASSETS_URL_PATH;
	}

	public static get localesUrlPath(): string {
		return this.LOCALES_URL_PATH;
	}

	public static setVar(vars: ConstantVars): void {
		for (const key in vars) {
			if (Object.hasOwn(this, key)) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				this[key] = vars[key];
			}
		}
	}
}
