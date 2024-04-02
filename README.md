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

To build your project using the provided webpack configurations, run the following command:

```typescript
// gincat-webpack.js

import GincatWebpack from '@gincat-digital/webpack';
import path from 'path';
import { fileURLToPath } from 'url';

// This is because `__dirname` is undefined during client instances.
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default new GincatWebpack(path.resolve(__dirname, '../'));
```

```javascript
// webpack.dev.js

import gincatWebpack from './gincat-webpack';

// Default development configuration
export default gincatWebpack.development;
```

```javascript
// webpack.prod.js

import gincatWebpack from './gincat-webpack';

// Default production configuration
export default gincatWebpack.prod;
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

import gincatWebpack from './gincat-webpack';

// Default development configuration
export default {
	...gincatWebpack.development,
	entries: {
		main: 'src/App.tsx',
	},
};
```

You can also include multiple entries without overriding the default:

```javascript
// webpack.dev.js

import gincatWebpack from './gincat-webpack';

// Default development configuration
export default {
	...gincatWebpack.development,
	entry: gincatWebpack.getEntry({ app2: 'src/app2/App2.tsx' }, true), // The second parameter allow yo include the default config

// Output:
/* -------------
entry: {
	app: 'src/app/App.tsx',
	app2: 'src/app2/App2.tsx',
} 
------------- */
};
```

### Adding Plugins

You can add webpack plugins to enhance the functionality of your build process. Simply install the desired plugin via npm and configure it in your webpack configuration file.

```javascript
// webpack.dev.js

import gincatWebpack from './gincat-webpack';
import MyWebpackPlugin from 'my-webpack-plugin';

// Default development configuration
export default {
	...gincatWebpack.development,
	plugins: [
		...gincatWebpack.getPlugins(),
		new MyWebpackPlugin(),
	],
};
```

## `GincatWebpack` API

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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.