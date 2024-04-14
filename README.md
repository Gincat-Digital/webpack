# @gincat-digital/webpack

@gincat-digital/webpack is a comprehensive webpack configuration package designed specifically for projects developed at Gincat Digital using React. It provides default configurations to streamline the development process, optimize images and JSON files, and allows for full customization to meet the requirements of individual projects.

## Features

- **Webpack Dev Server**: Includes a webpack dev server for faster development and debugging.
- **Image Optimization**: Optimizes images to enhance performance.
- **JSON Optimization**: Optimizes JSON files for improved loading times.
- **Customizable**: All configurations are fully customizable to adapt to any project's requirements.

## Installation

You can install the package via npm:

```bash
npm install @gincat-digital/webpack --save-dev
```

## Usage

Once installed, you can use the provided CLI tool to start the development server or build your project.

### Initial configuration

To build your project using the provided webpack configurations, create the following files:

```typescript
// gcwp.js

import GincatWebpack from '@gincat-digital/webpack';

export default new GincatWebpack(process.cwd()) /* Project root */);
```

```javascript
// webpack.dev.js

import gcwp from './gcwp';

// Default development configuration
export default gcwp.development;
```

```javascript
// webpack.prod.js

import gcwp from './gcwp';

// Default production configuration
export default gcwp.prod;
```

### Using the client tool

To start the webpack dev server or build your project, add the following command to your package.json adding your custom configuration files path from your project's root:

```json
{
	"scripts": {
		"dev": "gcwp --config=webpack.dev.js",
		"build": "gcwp --config=webpack.prod.js"
	}
}
```

## Extending Features

@gincat-digital/webpack is designed to be easily extensible to accommodate additional features or customizations. Below are some ways you can extend its functionality:

### Modifying entry

By default, webpack will look for `src/app/App.tsx`, but you can override this in the initial configuration or in your config file:

```typescript
// gincat-webpack.js

export default new GincatWebpack(/* root path */, {
	entry: {
		main: 'src/App.tsx',
	},
});
```

or

```javascript
// webpack.dev.js

import gcwp from './gcwp';

// Default development configuration
export default {
	...gcwp.development,
	entries: {
		main: 'src/App.tsx',
	},
};
```

You can also include multiple entries without overriding the default:

```javascript
// webpack.dev.js

import gcwp from './gcwp';

// Default development configuration
export default {
	...gcwp.development,
	entry: {
		...gcwp.development.entry,
		app2: 'src/app2/App2.tsx',
	},
};

// Output:
/* -------------
entry: {
	app: 'src/app/App.tsx',
	app2: 'src/app2/App2.tsx',
} 
------------- */
```

### Adding Plugins

You can add webpack plugins to enhance the functionality of your build process. Simply install the desired plugin via npm and configure it in your webpack configuration file.

```javascript
// webpack.dev.js

import gcwp from './gcwp';
import MyWebpackPlugin from 'my-webpack-plugin';

// Default development configuration
export default {
	...gcwp.development,
	plugins: [
		...gcwp.development.plugins,
		new MyWebpackPlugin(),
	],
};
```

## `GincatWebpack` API

### `development`

This method returns the default webpack configuration for development.

### `production`

This method returns the default webpack configuration for production.

## `WebpackTools` API

### `constructor`

Initialize a new instance.

| Parameter      | Type                                | Description                                                  |
| -------------- | ----------------------------------- | ------------------------------------------------------------ |
| root           | string                              | Projects root folder path.                                        |
| config         | Config                              | Some preset configurations.  |

#### `config`
 
- `devServer (boolean)`: Enable or disable dev server (default: `true`).
- `entries (EntryOptions)`: Overrides default entry configuration.
- `output (OutputOptions)`: Overrides default output configuration.

---

### `getEntry`

This method returns the webpack entry configuration.

| Parameter      | Type                                | Description                                                  |
| -------------- | ----------------------------------- | ------------------------------------------------------------ |
| entry          | EntryOptions                        | Custom entry options.                                        |
| defaultConfig  | boolean                             | Flag to include default configuration (default to `false`). |

| Return Type                   | Description                  |
| ----------------------------- | ---------------------------- |
| GincatWebpackConfig['entry'] | Webpack entry configuration. |

---

### `getOutput`

This method returns the webpack output configuration.

| Parameter | Type            | Description             |
| --------- | --------------- | ----------------------- |
| output    | OutputOptions   | Custom output options.  |

| Return Type            | Description                |
| ---------------------- | -------------------------- |
| OutputOptions          | Webpack output configuration. |

---

### `getResolve`

This method returns the webpack resolve configuration.

| Parameter      | Type                         | Description                                                     |
| -------------- | ---------------------------- | --------------------------------------------------------------- |
| resolve        | GincatWebpackConfig['resolve'] | Custom resolve options.                                         |
| defaultConfig  | boolean                      | Flag to include default configuration (default to `false`). |

| Return Type               | Description               |
| ------------------------- | ------------------------- |
| GincatWebpackConfig['resolve'] | Webpack resolve configuration. |

---

### `getPlugins`

This method returns an array of webpack plugins.

| Parameter      | Type                           | Description                                                          |
| -------------- | ------------------------------ | -------------------------------------------------------------------- |
| plugins        | Array<WebpackPluginInstance>  | Custom webpack plugins.                                              |
| defaultConfig  | boolean                        | Flag to include default configuration (default to `false`).      |

| Return Type           | Description                      |
| --------------------- | -------------------------------- |
| Array<WebpackPluginInstance> | Array of webpack plugins.        |

---

### `getDevServer`

This method returns the webpack dev server configuration.

| Parameter      | Type                         | Description                                                          |
| -------------- | ---------------------------- | -------------------------------------------------------------------- |
| devServer      | WebpackDevServerConfig       | Custom dev server options.                                          |
| defaultConfig  | boolean                      | Flag to include default configuration (default to `false`).   |

| Return Type                   | Description                            |
| ----------------------------- | -------------------------------------- |
| GincatWebpackConfig['devServer'] | Webpack dev server configuration.      |

---

### `getModule`

This method returns the webpack module configuration.

| Parameter      | Type                        | Description                                                          |
| -------------- | --------------------------- | -------------------------------------------------------------------- |
| modules        | ModuleOptions               | Custom module options.                                               |
| defaultConfig  | boolean                     | Flag to include default configuration (default to `false`).      |

| Return Type         | Description                    |
| ------------------- | ------------------------------ |
| ModuleOptions       | Webpack module configuration. |

---

### `getOptimization`

This method returns the webpack optimization configuration.

| Parameter      | Type                           | Description                                                            |
| -------------- | ------------------------------ | ---------------------------------------------------------------------- |
| optimization   | OptimizationOptions            | Custom optimization options.                                           |
| defaultConfig  | boolean                        | Flag to include default configuration (default to `false`).   |

| Return Type              | Description                     |
| ------------------------ | ------------------------------- |
| OptimizationOptions      | Webpack optimization configuration. |

---

### `config`

This method generates the complete webpack configuration object.

| Return Type         | Description                       |
| ------------------- | --------------------------------- |
| GincatWebpackConfig | Complete webpack configuration.  |

---

## TODO

- Add client options to run default configurations without specifying custom files.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.