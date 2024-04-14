import { isArray, mergeWith } from 'lodash-es';

export const mergeConfig = <Def extends object, Cus extends object>(
	defaultConfig: Def,
	customConfig: Cus,
): Def & Cus => {
	return mergeWith(
		defaultConfig,
		customConfig,
		(object, source): Array<unknown> | undefined =>
			isArray(object) ? object.concat(source) : undefined,
	);
};
