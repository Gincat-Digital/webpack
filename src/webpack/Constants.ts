import { ConstantVars } from '../types/Constants.types';

export class Constants {
	// Folder names
	private static SRC_FOLDER_NAME: ConstantVars['SRC_FOLDER_NAME'] = 'src';
	private static ASSETS_FOLDER_NAME: ConstantVars['ASSETS_FOLDER_NAME'] =
		'assets';
	private static LOCALES_FOLDER_NAME: ConstantVars['LOCALES_FOLDER_NAME'] =
		'locales';
	private static ENTRY_FOLDER_NAME: ConstantVars['ENTRY_FOLDER_NAME'] = 'app';
	private static DIST_FOLDER_NAME: ConstantVars['DIST_FOLDER_NAME'] = 'dist';
	private static OUTPUT_FOLDER_NAME: ConstantVars['OUTPUT_FOLDER_NAME'] = 'js';

	// File names
	private static ENTRY_FILE_NAME: ConstantVars['ENTRY_FILE_NAME'] = 'App';
	private static OUTPUT_FILE_NAME: ConstantVars['OUTPUT_FILE_NAME'] = 'app';

	// Paths
	private static ENTRY_PATH: ConstantVars['ENTRY_PATH'] = `/${this.SRC_FOLDER_NAME}/${this.ENTRY_FOLDER_NAME}`;
	private static OUTPUT_PATH: ConstantVars['OUTPUT_PATH'] = `/${this.DIST_FOLDER_NAME}/${this.OUTPUT_FOLDER_NAME}`;
	private static SRC_PATH: ConstantVars['SRC_PATH'] = `/${this.SRC_FOLDER_NAME}`;
	private static ASSETS_PATH: ConstantVars['ASSETS_PATH'] = `/${this.SRC_FOLDER_NAME}/${this.ASSETS_FOLDER_NAME}`;
	private static LOCALES_PATH: ConstantVars['LOCALES_PATH'] = `/${this.SRC_FOLDER_NAME}/${this.LOCALES_FOLDER_NAME}`;
	private static WATCH_PATH: ConstantVars['WATCH_PATH'] = `/${this.SRC_FOLDER_NAME}/**/*`;

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
	private static ASSETS_URL_PATH: ConstantVars['ASSETS_URL_PATH'] =
		'/private static';
	private static LOCALES_URL_PATH: ConstantVars['LOCALES_URL_PATH'] =
		'/private static';

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

	public static get entryFileName(): string {
		return this.ENTRY_FILE_NAME;
	}

	public static get outputFileName(): string {
		return this.OUTPUT_FILE_NAME;
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
				this[key] = vars[key];
			}
		}
	}
}
